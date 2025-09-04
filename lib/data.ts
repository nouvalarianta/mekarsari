// Mock data - in real app this would come from database
export const products = [
  {
    id: 1,
    name: "Set Piring Keramik Putih",
    category: "Piring & Mangkuk",
    price: "Rp 5.000/hari",
    images: [
      "/white-ceramic-dinner-plates-set-elegant-main-view.png",
      "/white-ceramic-dinner-plates-set-elegant-side-view.png",
      "/white-ceramic-dinner-plates-set-elegant-detail-vie.png",
    ],
    description:
      "Set piring keramik putih elegan untuk 10 orang. Terbuat dari keramik berkualitas tinggi dengan finishing yang halus dan tahan lama.",
    specifications: {
      Material: "Keramik Premium",
      Jumlah: "10 piring",
      Diameter: "25 cm",
      Warna: "Putih",
      Berat: "2.5 kg per set",
      Kondisi: "Sangat Baik",
    },
    available: true,
    rating: 4.8,
    reviews: 24,
    features: [
      "Tahan panas hingga 200°C",
      "Aman untuk microwave",
      "Mudah dibersihkan",
      "Design elegan dan timeless",
      "Cocok untuk acara formal dan casual",
    ],
  },
  // ... other products can be added here
]