# 💍 Wedding Invitation — Next.js

Undangan pernikahan online mewah dengan tema **Gold & Ivory**, dibangun menggunakan:
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **GSAP** (loading screen, scroll animations, parallax, cursor)
- **Framer Motion** (fade in, slide, stagger, AnimatePresence)
- **Lenis** (smooth scrolling — opsional)
- **react-intersection-observer** (trigger animasi saat scroll)

---

## 🚀 Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka browser
http://localhost:3000
```

---

## ✏️ Cara Kustomisasi

Semua data pernikahan ada di satu file:

```
app/config.ts
```

Edit file tersebut untuk mengganti:
- **Nama mempelai** (bride & groom)
- **Nama orang tua**
- **Tanggal & waktu acara**
- **Lokasi acara**
- **Nomor rekening**
- **Link Google Maps**
- **Ayat pembuka**

---

## 📁 Struktur Project

```
wedding-invitation/
├── app/
│   ├── config.ts              ← ✏️ Edit data di sini
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx               ← Halaman utama
│   ├── components/
│   │   ├── CustomCursor.tsx   ← Cursor emas custom
│   │   ├── FloatingPetals.tsx ← Animasi petal melayang
│   │   ├── Footer.tsx
│   │   ├── Loader.tsx         ← Loading screen animasi
│   │   ├── MusicButton.tsx
│   │   └── Navbar.tsx
│   └── sections/
│       ├── HeroSection.tsx    ← Hero + parallax
│       ├── OpeningSection.tsx ← Bismillah + ayat
│       ├── CoupleSection.tsx  ← Profil mempelai
│       ├── EventSection.tsx   ← Jadwal acara
│       ├── CountdownSection.tsx ← Hitung mundur live
│       ├── GallerySection.tsx ← Auto-scroll gallery
│       ├── LocationSection.tsx← Peta lokasi
│       ├── GiftSection.tsx    ← Amplop digital / rekening
│       ├── RSVPSection.tsx    ← Form RSVP
│       └── WishesSection.tsx  ← Ucapan tamu
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 🖼️ Menambahkan Foto

Untuk menambah foto pasangan dan galeri:

1. Simpan foto di folder `public/images/`
2. Di `CoupleSection.tsx`, ganti placeholder dengan:
   ```jsx
   import Image from "next/image";
   <Image src="/images/bride.jpg" alt="Bride" fill className="object-cover" />
   ```
3. Di `GallerySection.tsx`, ganti `GalleryCard` dengan gambar sungguhan

---

## 🌐 Deploy ke Vercel

```bash
npm install -g vercel
vercel
```

Atau push ke GitHub dan connect ke [vercel.com](https://vercel.com).

---

## 🎨 Tema Warna

Edit di `tailwind.config.ts`:

```ts
colors: {
  gold: { DEFAULT: "#C9A84C" },   // Warna utama emas
  ivory: { DEFAULT: "#F9F5EE" },  // Background terang
  deep: { DEFAULT: "#1A1208" },   // Background gelap
}
```

---

Dibuat dengan ♥ untuk momen paling indah dalam hidup.
