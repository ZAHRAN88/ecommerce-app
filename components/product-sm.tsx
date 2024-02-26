"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { XCircle } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import Carousel from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"



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
  
  const sliderSettings = {
    dots: true, // Add navigation dots below the carousel
    infinite: true, // Allow continuous looping 
    slidesToShow: 3,  // Show 3 products per slide
    slidesToScroll: 1, // Slide 1 item at a time
    autoplay: true, // Optionally enable autoplay
    autoplaySpeed: 3000, // Control autoplay speed (in milliseconds)
    responsive: [ // Responsiveness for different screen widths
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    
    <div className="">
 

 <Slider {...sliderSettings} className="w-full">
    {products.map((product) => (
      
      <Link key={product._id} href={`/products/${product.slug}`} className="group h-80 ">
        <div className="relative overflow-hidden h-80 rounded-lg mx-2 border border-gray-200 bg-white  pb-16  dark:bg-slate-900 dark:border-slate-900 dark:text-white  shadow-md transition-transform duration-300 transform hover:translate-y-1">
          <Image
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
            src={urlForImage(product.images[0]).url()}
            alt={product.name}
            width={250}
            height={250}
            className="w-full h-48 object-cover transition-transform duration-300 transform "
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900  dark:text-white truncate">{product.name}</h3>
            <p className="mt-4 text-base font-semibold text-gray-700">{`Price: ${formatCurrencyString({ currency: product.currency, value: product.price })}`}</p>

          </div>
          {/* You can add the badge here */}
          {/* {product.isNewArrival && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-br-lg rounded-tr-lg text-xs font-semibold">
              New Arrival
            </div>
          )}
          {product.isBestSeller && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-br-lg rounded-tr-lg text-xs font-semibold">
              Best Seller
            </div>
          )} */}
        </div>
      </Link>
     
    ))}
     </Slider>
    
</div>
  
  


  )
}
