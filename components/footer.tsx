import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg"><Image src="/logo.png" alt="Mekarsari" width={32} height={32} /></span>
              </div>
              <span className="font-playfair font-bold text-xl">Mekarsari</span>
            </div>
            <p className="text-muted-foreground">
              Penyedia peralatan catering terpercaya dengan koleksi lengkap dan kualitas terjamin untuk berbagai acara
              Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-playfair font-semibold text-lg">Menu Cepat</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Beranda
              </Link>
              <Link href="/katalog" className="text-muted-foreground hover:text-primary transition-colors">
                Katalog
              </Link>
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Tentang Kami
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-playfair font-semibold text-lg">Kategori</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/katalog?category=Barang%201" className="text-muted-foreground hover:text-primary transition-colors">
                Barang 1
              </Link>
              <Link href="/katalog?category=Barang%202" className="text-muted-foreground hover:text-primary transition-colors">
                Barang 2
              </Link>
              <Link href="/katalog?category=Barang%203" className="text-muted-foreground hover:text-primary transition-colors">
                Barang 3  
              </Link>
              <Link href="/katalog?category=Barang%204" className="text-muted-foreground hover:text-primary transition-colors">
                Barang 4
              </Link>
              <Link href="/katalog?category=Barang%205" className="text-muted-foreground hover:text-primary transition-colors">
                Barang 5
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-playfair font-semibold text-lg">Kontak Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+62 822-2953-7433</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">iamchoirul1@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Surabaya, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Senin - Sabtu: 08:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">© 2024 Mekarsari. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
