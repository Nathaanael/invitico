// =============================================
// KONFIGURASI PERNIKAHAN — Edit di sini!
// =============================================

export const weddingConfig = {
  // Nama mempelai
  bride: {
    name: "Rania",
    fullName: "Rania Safira Putri",
    initial: "R",
    fatherName: "Bapak Ahmad Fauzi",
    motherName: "Ibu Siti Rahayu",
  },
  groom: {
    name: "Aryan",
    fullName: "Aryan Dika Pratama",
    initial: "A",
    fatherName: "Bapak Hendra Wijaya",
    motherName: "Ibu Dewi Kusuma",
  },

  // Tanggal & waktu
  weddingDate: new Date("2025-11-15T08:00:00"),
  weddingDateDisplay: "Sabtu, 15 November 2025",

  // Acara
  events: [
    {
      id: "akad",
      type: "Akad Nikah",
      icon: "🕊️",
      time: "08.00 WIB",
      date: "Sabtu, 15 November 2025",
      venue: "The Church of Our Lady of the Assumption",
      address: "Jl. Katedral No.7B, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat",
    },
    {
      id: "resepsi",
      type: "Resepsi",
      icon: "🌹",
      time: "11.00 – 15.00 WIB",
      date: "Sabtu, 15 November 2025",
      venue: "The Grand Ballroom",
      address: "Hotel Mulia Senayan, Jakarta Pusat",
    },
  ],

  // Lokasi maps
  mapsUrl: "https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta",
  locationName: "The Grand Ballroom — Hotel Mulia Senayan",

  // Rekening (opsional)
  bankAccounts: [
    {
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "Rania Safira Putri",
    },
    {
      bank: "Mandiri",
      accountNumber: "0987654321",
      accountName: "Aryan Dika Pratama",
    },
  ],

  // Teks undangan (tampil di section pembuka setelah Bismillah)
  invitationText:
    "Dengan penuh syukur kepada Tuhan Yang Maha Kasih, kami bermaksud menyelenggarakan pernikahan putra-putri kami. Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu dan menjadi saksi atas berkat Tuhan dalam ikatan pernikahan kudus ini.",
};