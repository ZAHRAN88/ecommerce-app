"use client"

import { useState } from "react"
import { Currency,  Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import  Link  from "next/link"

import { Button } from "@/components/ui/button"

export function CartSummary() {
  const {
    totalPrice,
    formattedTotalPrice,
    cartDetails,
    cartCount,
    redirectToCheckout,
  } = useShoppingCart()
  const [isLoading, setIsLoading] = useState(false)
  const isDisabled = isLoading || cartCount === 0
  const ShippingAmount = cartCount! > 0 ? 500 : 0
  const totalAmount = totalPrice! + ShippingAmount

  async function onCheckout() {
    setIsLoading(true)
    const response = await fetch('/api/checkout', {
      method: "POST",
      body: JSON.stringify(cartDetails),
    })
    const data = await response.headers.get("Content-Type") === "application/json" ? await response.json() : await response.text()
    console.log(data)
    const result = await redirectToCheckout(data.id)
    if (result?.error) {
      console.error(result)
    }
    setIsLoading(false)
  }

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">{formattedTotalPrice}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">
            {formatCurrencyString({ value: ShippingAmount, currency: "USD" })}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {formatCurrencyString({ value: totalAmount, currency: "USD" })}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <Link href="/success">

{/* i want on click it be loading for 2 seconds then go t */}
        <Button  disabled={isDisabled} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Loading..." : "Checkout"}
        </Button>
        </Link>
      </div>
    </section>
  )
}
