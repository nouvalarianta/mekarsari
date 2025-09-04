"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { categories, products } from "@/lib/products"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart } from "lucide-react"

const INITIAL_PRODUCT_LIMIT = 6

function ProductCatalogUI() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q") || ""
  const categoryQuery = searchParams.get("category") || "Semua"
  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState(categoryQuery)
  const [favorites, setFavorites] = useState<number[]>([])
  const [displayLimit, setDisplayLimit] = useState(INITIAL_PRODUCT_LIMIT)

  // Sinkronkan state dengan parameter di URL saat berubah
  useEffect(() => {
    setSelectedCategory(categoryQuery)
  }, [categoryQuery])

  // Gunakan useMemo untuk optimasi, agar filter tidak berjalan di setiap render
  const filteredProducts = useMemo(() => {
    let tempProducts = products

    // 1. Filter berdasarkan kategori
    if (selectedCategory !== "Semua") {
      tempProducts = tempProducts.filter((product) => product.category === selectedCategory)
    }

    // 2. Filter berdasarkan query pencarian
    if (searchQuery) {
      tempProducts = tempProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return tempProducts
  }, [selectedCategory, searchQuery])

  // Reset batas tampilan saat filter atau pencarian berubah
  useEffect(() => {
    setDisplayLimit(INITIAL_PRODUCT_LIMIT)
  }, [selectedCategory, searchQuery])

  const displayedProducts = filteredProducts.slice(0, displayLimit)

  const handleCategoryChange = (category: string) => {
    const currentParams = new URLSearchParams(searchParams.toString())
    if (category === "Semua") {
      // Hapus parameter jika kategori adalah "Semua" untuk URL yang lebih bersih
      currentParams.delete("category")
    } else {
      currentParams.set("category", category)
    }
    router.push(`/katalog?${currentParams.toString()}`)
  }

  const handleShowAll = () => {
    setDisplayLimit(filteredProducts.length) // Tampilkan semua produk di kategori ini
  }

  const handleShowLess = () => {
    setDisplayLimit(INITIAL_PRODUCT_LIMIT) // Kembali ke batas tampilan awal
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground mb-4">Katalog Peralatan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilih dari berbagai koleksi peralatan catering berkualitas tinggi yang siap membantu kesuksesan acara Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 3. Tampilkan produk yang sudah dibatasi jumlahnya */}
          {displayedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardHeader className="p-0 relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 p-0 rounded-full bg-background/80 backdrop-blur shadow-md"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-slate-500"}`} />
                  </Button>
                  <Link href={`/produk/${product.id}`}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0 rounded-full bg-background/80 backdrop-blur shadow-md"
                    >
                      <Eye className="w-4 h-4 text-slate-500" />
                    </Button>
                  </Link>
                </div>
                {!product.available && (
                  <Badge variant="destructive" className="absolute top-4 left-4">
                    Tidak Tersedia
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="font-playfair text-xl">{product.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                  <div className="text-lg font-semibold text-primary">{product.price}</div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="flex gap-2 w-full">
                  <Link href={`/produk/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Lihat Detail
                    </Button>
                  </Link>
                  {product.available ? (
                    <a
                      href={`https://wa.me/6282229537433?text=${encodeURIComponent(
                        `Halo, saya tertarik untuk menyewa produk "${product.name}".`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full">Sewa Sekarang</Button>
                    </a>
                  ) : (
                    <Button className="flex-1" disabled>
                      Tidak Tersedia
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* 4. Tombol untuk menampilkan lebih banyak atau lebih sedikit produk */}
        <div className="text-center mt-12">
          {displayedProducts.length < filteredProducts.length ? (
            <Button size="lg" variant="outline" onClick={handleShowAll}>
              Tampilkan Semua Produk
            </Button>
          ) : filteredProducts.length > INITIAL_PRODUCT_LIMIT ? (
            <Button size="lg" variant="outline" onClick={handleShowLess}>
              Lihat Lebih Sedikit
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function ProductCatalog() {
  return (
    <Suspense>
      <ProductCatalogUI />
    </Suspense>
  )
}
