
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"

import { cn } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"

interface Props {
  searchParams: {
    date?: string
    price?: string
    color?: string
    category?: string
    size?: string
    search?: string
  }
}

export default async function Shop({ searchParams }: Props) {
  const { date = "desc", price, category, color, size, search } = searchParams
  const dateOrder = date ? `| order(date ${date})` : ""
  const priceOrder = price ? `| order(price ${price})` : ""

  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product"`
  const colorFilter = color ? `&& "${color}" in colors` : ``
  const categoryFilter = category ? `&& "${category}" in categories` : ``
  const sizeFilter = size ? `&& "${size}" in Sizes` : ``
  const searchFilter = search ? `&& name match "${search}*"` : ``

  const filter = `${productFilter}${categoryFilter}${colorFilter}${sizeFilter}${searchFilter}`

  let products = await client.fetch<SanityProduct[]>(
    groq`*[${filter}] ${order}  {
       
      _id,
      name,
      sku,
      price,
      currency,
      description,
      "slug": slug.current,
      images,
      isBestSeller,
      isNewArrival 

    }`
  )
  const uniqueProductsMap = new Map();

// Filter out duplicate products based on their IDs
products = products.filter(product => {
  
    if (!product.isBestSeller || !product.isNewArrival) {
        return true;
    }
});

  return (
    <div>
      <hr />
      <div className="flex items-center justify-between border-b border-gray-200 text-center dark:border-gray-800 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-2xl font-bold">Shop </h2>
          <p className="text-lg text-gray-700">
            All Products Are Available Here
          </p>
        </div>
      </div>

      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} result{products.length === 1 ? "" : "s"}
            </h1>

            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-10",
                products.length > 0
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-[1fr_3fr]"
              )}
            >
              <div className="hidden lg:block">
                {/* Product filters */}
                <ProductFilters />
              </div>
              <ProductGrid products={products} />
              {/* Product grid */}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
