import { log } from "console"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { seedSanityData } from "@/lib/seed"
import { cn } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSmall } from "@/components/product-sm"
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

export default async function Page({ searchParams }: Props) {
  const { date = "desc", price, category, color, size, search } = searchParams
  const dateOrder = date ? `| order(date ${date})` : ""
  const priceOrder = price ? `| order(price ${price})` : ""

  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product"`
  const colorFilter = color ? `&& "${color}" in colors` : ``
  const categoryFilter = category ? `&& "${category}" in categories` : ``
  const sizeFilter = size ? `&& "${size}" in Sizes` : ``
  const searchFilter = search ? `&& name match "${search}*"` : ``
  
  const newArrivals = await client.fetch<SanityProduct[]>(
    groq`*[_type == "product" && isNewArrival == true] ${order}{
      _id,
      name,
      sku,
      price,
      currency,
      description,
      "slug": slug.current,
      images
    }`
  )
  const bestSellers = await client.fetch<SanityProduct[]>(
    groq`*[_type == "product" && isBestSeller == true] ${order}{
      _id,
      name,
      sku,
      price,
      currency,
      description,
      "slug": slug.current,
      images
    }`
  )
  
  const newArrivalIds = newArrivals.map((product) => product._id);
  const bestSellerIds = bestSellers.map((product) => product._id);
  
  const newArrivalFilter = newArrivalIds.length > 0 ? ` && !_id in $newArrivalIds` : '';
  const bestSellerFilter = bestSellerIds.length > 0 ? ` && !_id in $bestSellerIds` : '';
  
  const filter = `${productFilter}${categoryFilter}${colorFilter}${sizeFilter}${searchFilter}${newArrivalFilter}${bestSellerFilter}`;
  
  const products = await client.fetch<SanityProduct[]>(
    groq`*[${filter}] ${order} {
      _id,
      name,
      sku,
      price,
      currency,
      description,
      "slug": slug.current,
      images
    }`,
    { newArrivalIds, bestSellerIds }
  );

  return (
    <div>
        
     {/*  <div className="px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">
          {siteConfig.name}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">
          {siteConfig.description}
        </p>
      </div> */}
      <hr />
      <div className=" pt-20 pb-16 flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-700">
            Insert your about content here...
          </p>
        </div>
      </div>
     
      <div>
        <main className="mx-auto max-w-6xl px-6">
          

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
           
             
            

          </section>
          <div className="pt-20 pb-16"> 
            <h2 className="text-2xl font-bold mb-4">New Arrivals</h2> 
            <ProductSmall products={newArrivals} /> 
        </div>

        {/* Best Sellers Section */}
        <div className="pt-20 pb-16"> 
            <h2 className="text-2xl font-bold mb-4">Best Sellers</h2> 
            <ProductSmall products={bestSellers} /> 
        </div>
        </main>
      </div>
    </div>
  )
}
