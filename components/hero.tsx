import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair font-bold text-4xl lg:text-6xl text-foreground leading-tight">
                Sewa Peralatan
                <span className="text-primary block">Catering Terbaik</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Lengkapi acara Anda dengan peralatan catering berkualitas tinggi. Dari piring elegan hingga peralatan
                masak profesional, kami menyediakan semua yang Anda butuhkan untuk kesuksesan acara Anda.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Dipercaya oleh 500+ pelanggan</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Use Next.js Link for navigation */}
              <a href="/katalog">
                <Button size="lg" className="group">
                  Lihat Katalog
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card">
              <img
                src="/hero.png"
                alt="Peralatan Catering Berkualitas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-90">Peralatan Tersedia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
