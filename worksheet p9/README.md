# Worksheet P9 — DOM, Event, dan Interaktivitas
**Nama:** Nuzula Firmansyah  
**NIM:** 25523137  
**Kelas:** A  
**Topik:** MARVEL STUDIOS

## Isi proyek
- `profil.html`: halaman profil dengan tabel film, filter kategori, daftar ulasan tersimpan, dan form ulasan dengan rating bintang 1–5.
- `styles.css`: gaya halaman serta komponen filter dan validasi.
- `js/app.js`: data profil, data proyek, dan fungsi murni yang berasal dari P8; dimuat sebagai skrip biasa supaya bisa dijalankan langsung dari `file://`.
- `js/dom.js`: pemilihan elemen, render data, event delegation, keadaan kosong, validasi form, dan penyimpanan ulasan di `localStorage`; dimuat setelah `app.js`.
- `Worksheet_PABW_Pertemuan9_Asli.docx`: lembar instruksi asli.

## Isian lembar A.2 — Daftar elemen
| Bagian halaman | Pemilih | Diisi apa | Nama variabel |
|---|---|---|---|
| Daftar proyek | `#tabel-proyek` | Baris film dari `daftarProyek` | `tbody` |
| Baris tombol filter | `#filter` | Menangani klik semua tombol filter | `barisFilter` |
| Pesan daftar kosong | `#pesan-kosong` | Pesan saat filter tidak menemukan film | `pesanKosong` |
| Form dan tiap kolomnya | `#form-ulasan`, `#nama-pengirim`, `#email-pengirim`, `input[name="rating"]`, `#isi-ulasan` | Memvalidasi nama, email, rating, dan ulasan | `form`, `inputNama`, `inputEmail`, `ratingInputs`, `inputUlasan` |

## Isian lembar B.3 — Pemeriksaan hasil
- Jumlah kartu/baris pada halaman: 3, sama dengan panjang `daftarProyek`.
- Baris paling atas: Avengers: Infinity War, sama dengan data pertama.
- Kolom karakter/rating menampilkan karakter dan rating contoh dalam lencana bintang berwarna emas pada skala 5.
- Isi kartu/tabel: dimasukkan dengan `textContent`, sehingga tampil sebagai teks.

## Isian lembar C.2 — Tombol filter
- Halaman baru: semua film tampil dan tombol “Semua” aktif.
- Klik Avengers: hanya dua film Avengers yang tampil.
- Klik Solo: hanya Iron Man yang tampil.
- Daftar digambar ulang dengan `render()` dan wadah dibersihkan terlebih dahulu sehingga tidak berlipat.

## Isian lembar D.3 — Validasi form
- Kirim form kosong: halaman tidak dimuat ulang dan pesan galat per kolom muncul.
- Isi nama minimal 2 karakter, email valid, pilih rating 1–5 bintang, dan tulis ulasan minimal 5 karakter: pesan galat hilang.
- Isi hanya spasi: tetap tidak sah karena nilai diperiksa dengan `trim()`.
- Tombol kirim aktif hanya jika semua kolom valid.
- Ulasan berhasil dikirim akan muncul pada bagian “Ulasan terkirim” dan tetap tersimpan di `localStorage` pada browser/perangkat yang sama; tombol “Hapus ulasan” menghapus ulasan setelah konfirmasi.

## Isian lembar E.4 — Catatan kasus
| Gejala | Sebab | Baris/perbaikan |
|---|---|---|
| Pemilih menghasilkan `null` | ID salah atau elemen belum tersedia | Cocokkan pemilih dengan ID pada `profil.html`; skrip diletakkan sebelum `</body>` |
| Pendengar berjalan ganda | Pendengar dipasang ulang saat render | Pendengar filter dipasang sekali di luar `render()` pada `#filter` |
| Daftar kosong tanpa penjelasan | Filter tidak menghasilkan data | `render()` menampilkan `#pesan-kosong` ketika array kosong |

## Isian tiket keluar F
1. Elemen daftar film diambil dengan `document.querySelector("#tabel-proyek")` dan disimpan di variabel `tbody`.
2. `querySelector` mengambil satu elemen pertama yang cocok atau `null`; `querySelectorAll` mengambil semua elemen sebagai `NodeList`. `map` tidak tersedia langsung pada `NodeList`; ubah dulu dengan `Array.from(...)` bila ingin memakai `map`.
3. Event delegation memasang satu pendengar di induk untuk semua tombol anak. Dibuktikan oleh `barisFilter.addEventListener("click", ...)` dan `event.target.closest("button")`.
4. Jika wadah tidak dikosongkan, baris lama tetap ada dan akan berlipat setiap kali render dipanggil.
5. `innerHTML` dapat menafsirkan masukan sebagai HTML. Proyek menggunakan `textContent` agar isi diperlakukan sebagai teks.

## F.2 Satu baris untuk diingat
Saya harus memastikan elemen benar-benar ada sebelum dipilih, mengosongkan wadah sebelum render, dan memasang event listener hanya sekali.

## F.4 Catatan untuk pengampu
- Bagian tersulit hari ini: memastikan render, filter, dan validasi memakai elemen yang benar serta tidak menggandakan isi.
- Yang ingin dibahas pada pertemuan berikutnya: cara memisahkan data, logika, dan tampilan agar mudah dirawat.

## Deklarasi penggunaan AI
AI membantu menyusun dan memeriksa kerangka `js/dom.js`, validasi form, dokumentasi README, dan pengisian contoh jawaban worksheet. Saya tetap bertanggung jawab memeriksa, menjalankan, memahami, dan menyesuaikan kode sebelum dikumpulkan.
