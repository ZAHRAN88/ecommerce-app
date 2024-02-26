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

export function ProductGrid({ products }: Props) {
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
    <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8">
  {products.map((product) => (
    <Link key={product._id} href={`/products/${product.slug}`} className="group text-sm relative h-80">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 transform hover:shadow-lg">
        <div className="aspect-h-1 aspect-w-1">
          <img
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(225, 180))}`}
            src={urlForImage(product.images[0]).url()}
            alt={product.name}
           /*  width={auto}
            height={180} */
            className="object-cover w-full  h-64"
          />
        </div>
        <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
          <p className="mt-1 text-base font-semibold text-gray-700">{`Price: ${formatCurrencyString({ currency: product.currency, value: product.price })}`}</p>
        </div>
        {product.isNewArrival && (
          <div className="absolute top-2 left-0 bg-blue-600 text-white px-2 py-1 rounded-e text-xs font-semibold">
            New Arrival
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-2 left-0 bg-orange-600 text-white px-2 py-1 rounded-e text-xs font-semibold">
            Best Seller
          </div>
        )}
      </div>
    </Link>
  ))}
</div>


  )
}
