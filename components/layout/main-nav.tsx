"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const mainNav = [
  {
    title: "Solutions",
    items: [
      {
        title: "Shared Kitchens",
        href: "/solutions/shared-kitchens",
        description: "Efficient space management for shared kitchen facilities",
      },
      {
        title: "Food Trucks",
        href: "/solutions/food-trucks",
        description: "Mobile operations and order management",
      },
      {
        title: "Small Restaurants",
        href: "/solutions/restaurants",
        description: "Complete restaurant management solution",
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
        description: "Latest updates and industry insights",
      },
      {
        title: "Case Studies",
        href: "/case-studies",
        description: "Success stories from our clients",
      },
      {
        title: "Documentation",
        href: "/docs",
        description: "Detailed platform documentation",
      },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden gap-6 lg:flex">
      {mainNav.map((item, index) =>
        item.items ? (
          <DropdownMenu key={`nav-${index}`}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "group flex items-center gap-1 text-base font-medium",
                  item.items?.some((subItem) => pathname === subItem.href) ? "text-primary" : "text-foreground",
                )}
              >
                {item.title}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[240px]">
              {item.items.map((subItem, subIndex) => (
                <DropdownMenuItem key={`subitem-${index}-${subIndex}`} asChild>
                  <Link href={subItem.href} className="flex flex-col gap-1 p-3">
                    <span className="text-base font-medium">{subItem.title}</span>
                    <span className="text-sm text-muted-foreground">{subItem.description}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={`nav-${index}`}
            href={item.href}
            className={cn(
              "flex items-center text-base font-medium",
              pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
            )}
          >
            {item.title}
          </Link>
        ),
      )}
    </nav>
  )
}

