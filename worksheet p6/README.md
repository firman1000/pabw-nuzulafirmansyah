# Worksheet P6 — Responsif Mobile-First

Nama: Nuzula Firmansyah  
NIM: 25523137  
Tema halaman: MARVEL STUDIOS

## A. Viewport dan lebar tetap

Meta viewport pada `profil.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Elemen berlebar tetap yang perlu diperhatikan:
- `layout.css`: sidebar menggunakan ukuran relatif `16rem`, bukan px.
- `komponen.css`: kartu tidak memakai width tetap; menggunakan grid dan `min-width: 0`.
- `base.css`: gambar tidak diberi width tetap; gambar dibatasi dengan `max-width: 100%` di `responsif.css`.

## B. Gaya dasar layar sempit

Pada `responsif.css`, halaman dimulai dengan satu kolom dan galeri satu kolom. Tidak ada media query untuk gaya dasar.

## C. Dua titik henti

- `48rem`: galeri berubah dari satu kolom menjadi dua kolom.
- `60rem`: sidebar bersanding dengan konten dan galeri menjadi tiga kolom.

Keduanya memakai `min-width` agar gaya dasar mobile tetap menjadi dasar dan aturan tambahan hanya menambah susunan.

## D. Gambar, tabel, dan teks

- Gambar: `max-width: 100%; height: auto;`
- Tabel: `.tabel-wrapper { overflow-x: auto; }`
- Paragraf: `font-size: 1rem; line-height: 1.6;`
- Teks panjang: `min-width: 0` dan `overflow-wrap: anywhere`.

## E. Uji tiga lebar

| Lebar | Jumlah kolom | Catatan |
|---|---:|---|
| 360 px | 1 | Halaman satu kolom, tidak ada gulir mendatar |
| 768 px | 2 pada galeri | Galeri mulai dua kolom |
| 1.280 px | 3 pada galeri + sidebar | Sidebar bersanding dengan konten |

### Tiket keluar

**Mengapa gaya dasar ditulis untuk layar sempit lebih dulu?**  
Karena mobile-first membuat struktur dasar sederhana dan aturan tambahan hanya diperlukan ketika ruang layar mencukupi.

**Dari mana Anda menentukan lebar titik henti?**  
Dari saat isi mulai memiliki ruang yang cukup untuk menambah kolom galeri dan menyandingkan sidebar dengan konten, bukan berdasarkan merek perangkat.

**Satu kasus luberan hari ini dan perbaikannya**  
Teks panjang dapat mendorong kolom. Perbaikannya menggunakan `min-width: 0` dan `overflow-wrap: anywhere`, sedangkan gambar dibatasi dengan `max-width: 100%`.

## Pemeriksaan

- Viewport terpasang: Lolos
- Tidak ada gulir mendatar pada 360 px: Lolos
- Galeri berubah kolom: Lolos
- Gambar tidak melebihi wadah: Lolos
- Tabel memiliki gulir sendiri: Lolos
- Teks menggunakan satuan relatif: Lolos

## Penilaian mandiri

| Bagian | Bobot | Nilai saya |
|---|---:|---:|
| Viewport dan gaya dasar | 30 | 30 |
| Dua titik henti | 30 | 30 |
| Gambar dan tabel | 20 | 20 |
| Kebersihan kode dan bukti uji | 20 | 20 |
| **TOTAL** | **100** | **100** |

## Catatan untuk pengampu

Bagian yang paling sulit: menjaga layout P5 tetap berfungsi saat berpindah dari satu kolom ke dua kolom lalu tiga kolom.

Yang ingin saya dibahas di kelas: cara menentukan breakpoint berdasarkan isi dan cara menguji overflow pada berbagai ukuran layar.
