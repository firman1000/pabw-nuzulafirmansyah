-- P20 Bagian 4: data awal valid
USE pustakauii;

INSERT INTO penerbit (nama, kota) VALUES ('Informatika Press', 'Bandung');
INSERT INTO kategori (nama_kategori) VALUES ('Komputer');
INSERT INTO buku (isbn, judul, tahun_terbit, jumlah_eksemplar, penerbit_id, kategori_id)
VALUES ('978-1', 'Basis Data', 2022, 3, 1, 1);
INSERT INTO anggota (nim, nama, email, tanggal_daftar)
VALUES ('2301001', 'Rina', 'rina@uii.ac.id', '2026-09-01');

-- Jalankan satu per satu untuk menguji penolakan. Masing-masing memang harus gagal.
-- A. FK: penerbit_id 99 tidak tersedia
-- INSERT INTO buku (isbn, judul, tahun_terbit, jumlah_eksemplar, penerbit_id, kategori_id)
-- VALUES ('978-99', 'Buku Uji FK', 2024, 1, 99, 1);

-- B. UNIQUE: NIM sudah digunakan
-- INSERT INTO anggota (nim, nama, email, tanggal_daftar)
-- VALUES ('2301001', 'Rina Duplikat', 'rina2@uii.ac.id', '2026-09-02');

-- C. CHECK: jatuh tempo lebih awal daripada tanggal pinjam
-- INSERT INTO peminjaman (anggota_id, tanggal_pinjam, tanggal_jatuh_tempo)
-- VALUES (1, '2026-10-10', '2026-10-01');

-- D. NOT NULL: nama tidak boleh NULL
-- INSERT INTO anggota (nim, nama, email, tanggal_daftar)
-- VALUES ('2301002', NULL, 'doni@uii.ac.id', '2026-09-03');

-- E. RESTRICT: penerbit masih dipakai oleh buku
-- DELETE FROM penerbit WHERE penerbit_id = 1;
