# PABW — Nuzula Firmansyah — 25523137

## Pertemuan 5 — Layout Modern: Flexbox dan Grid
- Topik halaman: MARVEL STUDIOS.
- Pekerjaan merupakan lanjutan dari Pertemuan 4 pada halaman yang sama.
- Kerangka halaman: tiga baris menggunakan `grid-template-rows: auto 1fr auto`.
- Area isi: dua kolom `16rem 1fr`; sidebar memakai area `sisi`, konten utama memakai area `utama`, dan blok bawah memakai area `bawah`.
- Navbar menggunakan Flexbox dengan `gap` dan `flex-wrap`.
- Galeri/kartu menggunakan Grid dengan `repeat(auto-fit, minmax(16rem, 1fr))`.
- Isi kartu menggunakan Flexbox/Grid dengan `gap`, `min-width: 0`, dan `overflow-wrap: anywhere` agar isi panjang tidak meluber.
- Penempatan blok menonjol menggunakan `grid-column: span 2` pada `.sorotan`.
- Tidak menggunakan `float` dan jarak antar komponen memakai `gap`.
- Layout diuji untuk lebar kecil dan besar; pada layar lebih sempit area isi berubah menjadi satu kolom agar tidak meluber.
- Tema gelap dari Pertemuan 4 dan pengalih tema tetap dipertahankan.

## A — Rencana kerangka
| Bagian | Pilihan |
|---|---|
| Baris halaman | `auto 1fr auto` |
| Kolom isi | `16rem 1fr` |
| Navbar | Flex, horizontal |
| Isi halaman | Grid, dua dimensi |
| Galeri/kartu | Grid adaptif |
| Isi kartu | Flex/Grid |

## D — Penempatan
- Blok Karakter & Pameran memakai `grid-column: span 2` sebagai blok yang menonjol.
- Area halaman memakai nama `sisi`, `utama`, dan `bawah` agar penempatan mudah dibaca.

## E — Kasus sulit
- Tinggi kartu: `min-height: 14rem` dan `align-content: start`.
- Isi panjang: `min-width: 0` dan `overflow-wrap: anywhere`.
- Luberan: tabel memakai pembungkus `overflow-x: auto`, sementara kolom grid memakai `minmax(0, 1fr)` pada mode satu kolom.

## F — Tiket keluar
- Bagian yang memakai flex: navbar dan komponen satu arah karena item disusun pada satu sumbu.
- Bagian yang memakai grid: kerangka halaman dan galeri karena membutuhkan susunan baris/kolom dua dimensi.
- Kasus meluber: isi panjang pada kartu/form; diperbaiki dengan `min-width: 0` dan `overflow-wrap: anywhere`.

## Catatan penggunaan AI
Worksheet P5 dikerjakan dengan bantuan AI berdasarkan Worksheet Pertemuan 5 dan berkas Pertemuan 4 yang sudah dibuat sebelumnya. Isi dan tema MARVEL STUDIOS tetap dipertahankan dari pekerjaan sebelumnya.
