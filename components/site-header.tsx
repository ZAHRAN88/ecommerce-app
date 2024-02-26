"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, Home, ShoppingBag, ShoppingCart } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultSearchQuery = searchParams.get("search") ?? ""
  const { cartCount } = useShoppingCart()

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isCurrentlyScrolled = scrollTop > 0;
      setIsScrolled(isCurrentlyScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const searchQuery = formData.get("search")
    router.replace(`/shop?search=${searchQuery}`)
  }

  return (
    <header className={`sticky top-0 z-40 w-full border-b bg-background ${isScrolled ? 'scrolled' : ''}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-x-4 space-x-4 px-6 ">
        <div className="sm:mr-3 pr-6">
          <MainNav />
        </div>

        {pathname === "/shop" && (
          <form className="hidden items-center lg:inline-flex" onSubmit={onSubmit}>
            <Input
              id="search"
              name="search"
              type="search"
              autoComplete="off"
              placeholder="Search products..."
              className="h-9 lg:w-[300px]"
              defaultValue={defaultSearchQuery}
            />
          </form>
        )}
        <div className="flex items-center space-x-1 sm:ml-8">
          <Link href="/">
            <Button size="sm" variant="ghost" title="Home">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          <Link href="/shop">
            <Button size="sm" variant="ghost" title="Shop">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shop</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button size="sm" variant="ghost" title="Cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          <ThemeToggle />
          {/* if we are in dev mode */}

          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <Button size="sm" variant="ghost">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
