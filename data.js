/*
  EDIT FILE INI UNTUK MENGGANTI KONTEN WEBSITE.
  Jangan masukkan data pribadi atau dokumen rahasia client.
*/
window.LUCKY_CONFIG = {
  brand: {
    name: "Lucky Consultant",
    eyebrow: "PORTOFOLIO & PENDAMPINGAN AKADEMIK",
    headline: "Tugas lebih rapi, proses lebih transparan.",
    description: "Pendampingan penyusunan dokumen, presentasi, pengolahan data, dan revisi dengan alur kerja yang mudah dipantau.",
    note: "Portfolio hanya menampilkan contoh yang sudah disamarkan atau dibuat ulang."
  },

  links: {
    tracking: "https://script.google.com/macros/s/AKfycby84kZEyUbOFlY2XhyaZ29VxhhShbnZ619t391xVhE2xZPE6K0OagM7cIFHuKeoOnuNTA/exec",
    whatsappNumber: "628XXXXXXXXXX",
    whatsappMessage: "Halo Lucky Consultant, saya ingin konsultasi mengenai layanan yang tersedia.",
    tiktok: "#",
    instagram: "#"
  },

  stats: [
    { value: 0, suffix: "+", label: "Pekerjaan selesai" },
    { value: 0, suffix: "+", label: "Ulasan positif" },
    { value: 6, suffix: "", label: "Jenis layanan" },
    { value: 100, suffix: "%", label: "Privasi dijaga" }
  ],

  services: [
    { icon: "document", title: "Makalah & Artikel", description: "Penyusunan struktur, penyuntingan, parafrase, dan perapian referensi." },
    { icon: "presentation", title: "PPT Presentasi", description: "Slide ringkas, visual rapi, dan mudah dipahami saat dipresentasikan." },
    { icon: "data", title: "Olah Data", description: "Pendampingan SPSS, tabel hasil, dan interpretasi sesuai kebutuhan analisis." },
    { icon: "edit", title: "Revisi Dokumen", description: "Perbaikan berdasarkan catatan dosen, reviewer, atau brief client." },
    { icon: "layout", title: "Formatting Word", description: "Heading, daftar isi otomatis, tabel, gambar, margin, dan penomoran." },
    { icon: "design", title: "Desain Akademik", description: "Poster, infografis, price list, dan materi visual pendukung." }
  ],

  portfolio: [
    {
      title: "Sistem Tracking Client",
      category: "Website & Sistem",
      image: "client-tracker.png",
      description: "Halaman pelacakan menggunakan Order ID dan PIN agar client dapat melihat progres pengerjaan secara mandiri.",
      tags: ["Order ID", "PIN", "Progress"]
    },
    {
      title: "Dashboard Manajemen Order",
      category: "Dashboard",
      image: "admin-dashboard.png",
      description: "Dashboard internal untuk mencatat status order, tenggat waktu, pembayaran, dan progres pekerjaan.",
      tags: ["Dashboard", "Spreadsheet", "Workflow"]
    },
    {
      title: "Price List Premium",
      category: "Desain Promosi",
      image: "price-list.png",
      description: "Desain daftar harga vertikal untuk konten TikTok dengan tampilan premium dan area testimoni.",
      tags: ["TikTok", "Price List", "Branding"]
    },
    {
      title: "PPT Presentasi",
      category: "Presentasi",
      image: "portfolio-ppt.svg",
      description: "Contoh tampilan portfolio. Ganti gambar ini dengan screenshot PPT terbaik yang sudah disamarkan.",
      tags: ["PPT", "Canva", "Presentasi"],
      demo: true
    },
    {
      title: "Formatting Dokumen",
      category: "Microsoft Word",
      image: "portfolio-word.svg",
      description: "Contoh tampilan portfolio. Ganti dengan before–after dokumen yang tidak menampilkan identitas client.",
      tags: ["Word", "Formatting", "Layout"],
      demo: true
    },
    {
      title: "Olah Data SPSS",
      category: "Analisis Data",
      image: "portfolio-spss.svg",
      description: "Contoh tampilan portfolio. Ganti dengan tabel atau output yang telah disamarkan dan diizinkan untuk ditampilkan.",
      tags: ["SPSS", "Statistik", "Interpretasi"],
      demo: true
    }
  ],

  testimonials: [
    {
      text: "Masukkan testimoni asli pelanggan di sini. Hapus tanda demo setelah teks dan identitasnya sudah sesuai.",
      name: "Inisial Client",
      role: "Jenis layanan",
      rating: 5,
      demo: true
    },
    {
      text: "Gunakan ulasan singkat yang menyoroti hasil, kecepatan respons, atau pengalaman revisi.",
      name: "Inisial Client",
      role: "Jenis layanan",
      rating: 5,
      demo: true
    },
    {
      text: "Jangan tampilkan nomor WhatsApp, nama lengkap, kampus, atau informasi sensitif tanpa izin.",
      name: "Inisial Client",
      role: "Jenis layanan",
      rating: 5,
      demo: true
    }
  ],

  faq: [
    { question: "Bagaimana cara melakukan order?", answer: "Klik tombol konsultasi, kirim jenis layanan, file atau brief, deadline, dan catatan khusus. Admin akan mengecek kebutuhan sebelum memberikan estimasi." },
    { question: "Apakah progres bisa dipantau?", answer: "Bisa. Setelah order dikonfirmasi, client menerima Order ID dan PIN untuk membuka halaman tracking." },
    { question: "Apakah tersedia revisi?", answer: "Ketentuan revisi menyesuaikan jenis layanan dan kesepakatan awal. Revisi di luar brief awal dapat dihitung sebagai tambahan pekerjaan." },
    { question: "Apakah data client aman?", answer: "Dokumen dan identitas client tidak ditampilkan sebagai portfolio tanpa penyamaran dan persetujuan." }
  ]
};
