"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Star, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  category: string
  price: string
  images: string[]
  description: string
  specifications: Record<string, string>
  available: boolean
  rating: number
  reviews: number
  features: string[]
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="py-8">
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

        {/* Back Button */}
        <Link href="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-card">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border"
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

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="font-playfair font-bold text-3xl text-foreground mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} ulasan)
                </span>
              </div>
              <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-playfair font-semibold text-lg mb-3">Keunggulan Produk</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1" disabled={!product.available}>
                {product.available ? "Sewa Sekarang" : "Tidak Tersedia"}
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Availability Status */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${product.available ? "bg-green-500" : "bg-red-500"}`} />
                <span className="font-medium">
                  {product.available ? "Tersedia untuk disewa" : "Sedang tidak tersedia"}
                </span>
              </div>
              {product.available && (
                <p className="text-sm text-muted-foreground mt-1">
                  Hubungi kami untuk mengecek ketersediaan pada tanggal yang Anda inginkan
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="font-playfair">Spesifikasi Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2">
                  <span className="font-medium">{key}:</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8 bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="font-playfair font-bold text-2xl mb-4">Tertarik dengan produk ini?</h3>
            <p className="mb-6 opacity-90">Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                WhatsApp: +62 822-2953-7433
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Email: info@cateringrental.com
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
