import { log } from "console"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { ProductSmall } from "@/components/product-sm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

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
function BgImageWithNavbar() {
  return (
    <header style={{ paddingLeft: 0,  position: "relative"}}
    
    className="relative flex h-96 items-center justify-center bg-cover bg-center bg-no-repeat "
    >
      
        
        <div className="banner-headings">
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className= "text-gray-700  dark:text-white">
                <h1 className="mb-3">Discover Your Perfect Style</h1>
                <h4 className="mb-3">Explore our latest collection and find the perfect items to elevate your wardrobe.</h4>
                <Link href="/shop">
                  <Button size="lg"  className=" mt-7 gap-x-2">
                    <span>Shop Now</span>
                    < ShoppingCart className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
     
    </header>
  )
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

  const newArrivalIds = newArrivals.map((product) => product._id)
  const bestSellerIds = bestSellers.map((product) => product._id)

  const newArrivalFilter =
    newArrivalIds.length > 0 ? ` && !_id in $newArrivalIds` : ""
  const bestSellerFilter =
    bestSellerIds.length > 0 ? ` && !_id in $bestSellerIds` : ""
  const bannerFilter = `_type == "product" && isBanner ==true`
  const filter = `${productFilter}${categoryFilter}${colorFilter}${sizeFilter}${searchFilter}${newArrivalFilter}${bestSellerFilter}`

  /*  const Bannerproduct = await client.fetch<SanityProduct[]>(
    groq`*[${bannerFilter}] ${order} {
      _id,
      name,
      sku,
      price,
      currency,
      description,
      "slug": slug.current,
      images: images[0]
    }`,
   
  ); */
  function Banner() {
    return (
      <div className="relative mb-10 py-8">
        {/* <img
          src="https://i.postimg.cc/rFwwFs01/shopping-banner.jpg" // Use the first product's image
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-96 object-cover"
          /> */}

        {/* Optional: overlay text or a call-to-action on the banner */}
        <div className="banner absolute inset-0 flex flex-col items-center justify-center text-center "></div>
        {/*  <div className="banner-text absolute flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold">Welcome to Our Store!</h2>
          <p>Find the best deals on our amazing products.</p>
        </div> */}
      </div>
    )
  }
  return (
    <div>
      <BgImageWithNavbar />
      <hr />
     {/*  <div className="  flex items-center justify-between border-b border-gray-200 pb-24 pt-24 dark:border-gray-800 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="section-description text-gray-600">At Ecommerce App, we're dedicated to revolutionizing the way you shop online. Since our inception, we've been committed to providing an unparalleled shopping experience that combines convenience, reliability, and innovation.
   Our team at Ecommerce App is composed of passionate individuals who share a common goal: to make online shopping easier, faster, and more enjoyable for everyone. With years of experience in the eCommerce industry, we understand the challenges customers face and strive to address them through cutting-edge technology and user-centric design.
   Whether you're browsing for the latest fashion trends, searching for essential household items, or exploring unique gift ideas, Ecommerce App has you covered. Our platform offers a wide range of products from trusted brands, ensuring that you find exactly what you're looking for, every time.
   At Ecommerce App, we're not just a shopping destination; we're your partner in discovering new products, exploring exciting deals, and enjoying seamless shopping experiences. Join us on this journey as we continue to innovate and elevate the world of online shopping.
   </p>
 
        </div>
      </div> */}

      <div>
        <main className="mx-auto max-w-6xl px-6">
          <section
            aria-labelledby="products-heading"
            className="pb-24 pt-6"
          ></section>
          <div className="py-20">
            <h2 className="mb-4 text-2xl font-bold">New Arrivals</h2>
            <ProductSmall products={newArrivals} />
          </div>

          {/* Best Sellers Section */}
          <div className="py-20">
            <h2 className="mb-4 text-2xl font-bold">Best Sellers</h2>
            <ProductSmall products={bestSellers} />
          </div>
        </main>
      </div>
    </div>
  )
}
