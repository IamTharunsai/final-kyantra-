import Link from "next/link"
import { MotionHeader } from "@/components/motion-wrapper"

import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function SiteHeader() {
  return (
    <MotionHeader
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center">
        <MobileNav />
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="relative h-10 w-10">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-Dm6y1mNAhe3d30mIwBGKyso59KbcTd.png"
              alt="Kyantra Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="hidden font-bold sm:inline-block">Kyantra</span>
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeSwitcher />
          </nav>
        </div>
      </div>
    </MotionHeader>
  )
}

