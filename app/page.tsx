import { Hero } from "@/components/hero"
import { ProductCatalog } from "@/components/product-catalog"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ProductCatalog />
    </div>
  )
}
