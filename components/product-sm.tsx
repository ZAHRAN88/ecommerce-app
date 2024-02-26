"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { XCircle } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"

interface Props {

  products: SanityProduct[]

}

export function ProductSmall({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900">
        <div>
          <XCircle className="mx-auto h-10 w-10 text-gray-500 dark:text-gray-200" />
          <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
            No products found
          </h1>
        </div>
      </div>
    )
  }

  return (
    
    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
      
    {products.map((product) => (
      <Link key={product._id} href={`/products/${product.slug}`} className="group">
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 transform hover:scale-105">
          <Image
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
            src={urlForImage(product.images[0]).url()}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-700">{formatCurrencyString({ currency: product.currency, value: product.price })}</p>
          </div>

          
          {/* if product isNewArrival add class name  bg-blue-500 to the element with id badge-B-N */}

          
         
             
           
          
         
        </div>
      </Link>
      
    ))}
  </div>
  
  


  )
}
