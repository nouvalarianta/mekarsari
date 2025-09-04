"use client"

import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const product = products.find((p) => p.id.toString() === params.id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Jika produk dengan ID dari URL tidak ditemukan, tampilkan halaman 404.
  if (!product) {
    notFound()
  }

  // Buat array gambar dummy untuk galeri, menggunakan gambar utama produk.
  const images = [product.image, "/dummy.svg", "/dummy.svg"].slice(0, 3)

  return (
    <div className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-primary">
            Katalog
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Tombol Kembali */}
        <Link href="/katalog" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gambar Produk */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-card border">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Produk */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating}</span>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">{product.price}</div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex space-x-2 sm:space-x-4">
              {product.available ? (
                <a
                  href={`https://wa.me/6282229537433?text=${encodeURIComponent(
                    `Halo, saya tertarik untuk menyewa produk "${product.name}". Bisakah saya mendapatkan informasi lebih lanjut?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button size="lg" className="w-full">
                    Sewa Sekarang
                  </Button>
                </a>
              ) : (
                <Button size="lg" className="flex-1" disabled>
                  Tidak Tersedia
                </Button>
              )}
              <Button size="lg" variant="outline" className="px-3" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button size="lg" variant="outline" className="px-3">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Status Ketersediaan */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${product.available ? "bg-green-500" : "bg-red-500"}`} />
                <span className="font-medium text-foreground">
                  {product.available ? "Tersedia untuk disewa" : "Sedang tidak tersedia"}
                </span>
              </div>
              {product.available && (
                <p className="text-sm text-muted-foreground mt-1 pl-6">
                  Hubungi kami untuk mengecek ketersediaan pada tanggal yang Anda inginkan.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bagian Kontak */}
        <Card className="mt-12 bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="font-playfair font-bold text-2xl mb-4">Tertarik dengan produk ini?</h3>
            <p className="mb-6 max-w-xl mx-auto opacity-90">
              Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik untuk acara Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/6282229537433" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  WhatsApp: +62 822-2953-7433
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
