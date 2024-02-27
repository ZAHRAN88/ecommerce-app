import next from "next"
import { NextResponse } from "next/server"
// @ts-ignore
import { validateCartItems } from "use-shopping-cart/utilities"


import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
  const cartDetails = await request.json()
  const line_items = validateCartItems( cartDetails)
  const origin = request.headers.get('origin')
  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    payment_method_types: ['card'],
    line_items: line_items,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ['US', 'EG', 'PS'],
    },
    shipping_options: [
      {
        shipping_rate: "shr_1On4kAClODE7p8sjMW9MZHQq",
      },
    ],
    billing_address_collection: "auto",

    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  })

return NextResponse.json(session, { status: 200 })
}
