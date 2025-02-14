"use client"

import { Bell, ChefHat, Menu, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
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
              <Link
                href="/"
                className="flex items-center"
                onClick={() => {
                  // Close sheet on mobile
                }}
              >
                <span className="font-bold">Kitchen Management</span>
              </Link>
            </div>
            <div className="my-4 px-4">
              <nav className="flex flex-col space-y-2">
                <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                  <ChefHat className="h-5 w-5" />
                  Kitchen
                </Link>
                <Link href="/orders" className="flex items-center gap-2 text-lg font-semibold">
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link href="/customers" className="flex items-center gap-2 text-lg font-semibold">
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 hidden lg:flex">
          <div className="relative h-10 w-10">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-5P3rw22fSjGIowhdK7VFhqbwzKwatG.png"
              alt="Kitchen Management Logo"
              className="h-full w-full"
            />
          </div>
          <span className="ml-2 hidden text-xl font-bold lg:flex lg:items-center">Kitchen Management</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                    3
                  </span>
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>New order received</DropdownMenuItem>
                <DropdownMenuItem>Low inventory alert</DropdownMenuItem>
                <DropdownMenuItem>Payment processed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}

