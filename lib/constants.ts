export const WHATSAPP_NUMBER = "6282121875785";

export function waUrl(message?: string) {
  const text = message
    ? encodeURIComponent(message)
    : "Halo%20Invoker%20Studio%2C%20saya%20tertarik%20dengan%20layanan%20Anda.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const socialLinks = {
  instagram: "https://www.instagram.com/invoker.studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
} as const;

export const services = [
  {
    id: "core",
    name: "Core",
    tagline: "Static & Fast",
    description:
      "Landing Page promosi, portofolio digital, optimalisasi SEO on-page, dan kecepatan load super instan.",
    tech: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    featuresList: [
      "Landing page statis & portofolio digital",
      "SEO on-page maksimal untuk visibilitas",
      "Loading super cepat tanpa database",
      "Hosting fleksibel di mana saja (static file)",
    ],
    priceRange: "Rp 1.000.000 - Rp 2.000.000",
    recommended: false,
  },
  {
    id: "dynamic",
    name: "Dynamic",
    tagline: "Sistem",
    description:
      "Sistem CRUD internal, database terintegrasi, dashboard dinamis, monitoring, & otomasi HPP.",
    tech: ["PHP Laravel", "CodeIgniter", "MySQL", "AJAX"],
    featuresList: [
      "Sistem CRUD internal & dashboard admin",
      "Database MySQL terintegrasi penuh",
      "Monitoring real-time & otomasi HPP",
      "Laporan dinamis & ekspor data",
    ],
    priceRange: "Rp 2.500.000 - Rp 4.500.000",
    recommended: true,
  },
  {
    id: "ecommerce",
    name: "E-Commerce Suite",
    tagline: "Full Solution",
    description:
      "Keranjang belanja, integrasi payment gateway otomatis, dan pengelolaan inventaris real-time.",
    tech: ["Custom Laravel", "Web Commerce"],
    featuresList: [
      "Toko online lengkap dengan keranjang belanja",
      "Payment gateway otomatis (Midtrans/Transfer)",
      "Manajemen inventaris real-time",
      "Dashboard penjualan & laporan keuangan",
    ],
    priceRange: "Rp 5.000.000 - Rp 15.000.000+",
    recommended: false,
  },
];

export const clients = [
  {
    name: "Eddy Motor Service Station",
    project: "Landing Page & Profil Bisnis",
    review: "Lumayan puas, websitenya bikin bengkel makin banyak pelanggan baru.",
    rating: 5,
  },
  {
    name: "Client A",
    project: "Sistem CRUD & Dashboard",
    review: "Dulu ribet pakai Excel, sekarang lebih gampang dan tim juga cepat tanggap.",
    rating: 5,
  },
  {
    name: "Client B",
    project: "E-Commerce Solution",
    review: "Akhirnya punya toko online yang beneran rapi dan gampang diurus sendiri.",
    rating: 5,
  },
];
