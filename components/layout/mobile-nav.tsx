"use client"

import { Menu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const mobileNav = [
  {
    title: "Solutions",
    items: [
      {
        title: "Shared Kitchens",
        href: "/solutions/shared-kitchens",
      },
      {
        title: "Food Trucks",
        href: "/solutions/food-trucks",
      },
      {
        title: "Small Restaurants",
        href: "/solutions/restaurants",
      },
    ],
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Resources",
    items: [
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Case Studies",
        href: "/case-studies",
      },
      {
        title: "Documentation",
        href: "/docs",
      },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
]

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-Dm6y1mNAhe3d30mIwBGKyso59KbcTd.png"
                alt="Kyantra Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="ml-2 font-bold">Kyantra</span>
          </Link>
        </div>
        <div className="my-4 px-4">
          <nav className="flex flex-col space-y-2">
            {mobileNav.map((item) => (
              <div key={item.title} className="flex flex-col space-y-3 pt-6">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div className="text-base font-medium">{item.title}</div>
                )}
                {item.items?.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

