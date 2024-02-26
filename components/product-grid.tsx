"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { XCircle } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"

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
        <Link
          key={product._id}
          href={`/products/${product.slug}`}
          className="group relative h-80 text-sm"
        >
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:shadow-lg hover:translate-y-2  dark:border-slate-900 dark:bg-slate-900 dark:text-white">
            <div className="aspect-h-1 aspect-w-1">
              <Image
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                  width={250}
                height={180} 
                className="h-64 w-full  object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-base font-semibold text-gray-700 dark:text-gray-500">{`Price: ${formatCurrencyString(
                { currency: product.currency, value: product.price }
              )}`}</p>
            </div>
            {product.isNewArrival && (
              <div className="absolute left-0 top-2 rounded-e bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                New Arrival
              </div>
            )}
            {product.isBestSeller && (
              <div className="absolute left-0 top-2 rounded-e bg-orange-600 px-2 py-1 text-xs font-semibold text-white">
                Best Seller
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
