import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <img src="https://i.postimg.cc/t4Rz6jPj/logo-png.png" className=" h-14 w-14" />
        <span className="inline-block font-bold">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
