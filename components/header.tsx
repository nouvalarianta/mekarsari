"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import Image from "next/image"

function HeaderUI() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")

  // Efek untuk melakukan pencarian secara real-time dengan debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Hanya update URL jika isi input berbeda dengan query di URL
      if (searchTerm !== (searchParams.get("q") || "")) {
        router.push(`/katalog?q=${searchTerm.trim()}`)
      }
    }, 300) // Delay 300ms setelah pengguna berhenti mengetik

    return () => clearTimeout(timeoutId)
  }, [searchTerm, router, searchParams])

  function handleSearch(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      const term = (event.target as HTMLInputElement).value.trim()
      if (term !== (searchParams.get("q") || "")) {
        router.push(`/katalog?q=${term}`)
      }
    }
  }
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg"><Image src="/logo.png" alt="Mekarsari" width={32} height={32} /></span>
            </div>
            <span className="font-playfair font-bold text-xl text-foreground">Mekarsari</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Beranda
            </Link>
            <Link href="/katalog" className="text-foreground hover:text-primary transition-colors">
              Katalog
            </Link>
            <Link href="/#" className="text-foreground hover:text-primary transition-colors">
              Tentang Kami
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari produk..."
                className="pl-10 w-64 bg-muted"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="https://wa.me/6282229537433" passHref>
              <Button>Hubungi Kami</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Beranda
              </Link>
              <Link href="/katalog" className="text-foreground hover:text-primary transition-colors">
                Katalog
              </Link>
              <Link href="/tentang" className="text-foreground hover:text-primary transition-colors">
                Tentang Kami
              </Link>
              <Link href="/kontak" className="text-foreground hover:text-primary transition-colors">
                Kontak
              </Link>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari produk..."
                  className="pl-10 bg-muted"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
              <Link href="https://wa.me/6282229537433" passHref className="w-full">
                <Button className="w-full">Hubungi Kami</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export function Header() {
  return (
    <Suspense>
      <HeaderUI />
    </Suspense>
  )
}
