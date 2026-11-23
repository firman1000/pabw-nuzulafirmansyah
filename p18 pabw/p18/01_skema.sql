-- PABW P20 - Skema Relasional PustakaUII
-- MySQL 8.0.16+
CREATE DATABASE IF NOT EXISTS pustakauii DEFAULT CHARACTER SET utf8mb4;
USE pustakauii;

-- Jalankan dari database kosong. Urutan tabel: induk lebih dahulu.
CREATE TABLE penerbit (
  penerbit_id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(120) NOT NULL,
  kota VARCHAR(100) NOT NULL,
  CONSTRAINT uq_penerbit_nama UNIQUE (nama)
) ENGINE=InnoDB;

CREATE TABLE kategori (
  kategori_id INT AUTO_INCREMENT PRIMARY KEY,
  nama_kategori VARCHAR(100) NOT NULL,
  CONSTRAINT uq_kategori_nama UNIQUE (nama_kategori)
) ENGINE=InnoDB;

CREATE TABLE pengarang (
  pengarang_id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(120) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE anggota (
  anggota_id INT AUTO_INCREMENT PRIMARY KEY,
  nim VARCHAR(20) NOT NULL,
  nama VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL,
  tanggal_daftar DATE NOT NULL,
  jalan VARCHAR(150) NULL,
  kota VARCHAR(100) NULL,
  rekomendasi_anggota_id INT NULL,
  CONSTRAINT uq_anggota_nim UNIQUE (nim),
  CONSTRAINT uq_anggota_email UNIQUE (email),
  CONSTRAINT fk_anggota_rekomendasi
    FOREIGN KEY (rekomendasi_anggota_id) REFERENCES anggota(anggota_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE buku (
  buku_id INT AUTO_INCREMENT PRIMARY KEY,
  isbn VARCHAR(30) NOT NULL,
  judul VARCHAR(150) NOT NULL,
  tahun_terbit SMALLINT NOT NULL,
  jumlah_eksemplar INT NOT NULL,
  penerbit_id INT NOT NULL,
  kategori_id INT NOT NULL,
  CONSTRAINT uq_buku_isbn UNIQUE (isbn),
  CONSTRAINT chk_buku_jumlah CHECK (jumlah_eksemplar >= 0),
  CONSTRAINT fk_buku_penerbit FOREIGN KEY (penerbit_id) REFERENCES penerbit(penerbit_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_buku_kategori FOREIGN KEY (kategori_id) REFERENCES kategori(kategori_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE buku_pengarang (
  buku_id INT NOT NULL,
  pengarang_id INT NOT NULL,
  PRIMARY KEY (buku_id, pengarang_id),
  CONSTRAINT fk_bp_buku FOREIGN KEY (buku_id) REFERENCES buku(buku_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_bp_pengarang FOREIGN KEY (pengarang_id) REFERENCES pengarang(pengarang_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE anggota_telepon (
  anggota_id INT NOT NULL,
  telepon VARCHAR(25) NOT NULL,
  PRIMARY KEY (anggota_id, telepon),
  CONSTRAINT fk_telepon_anggota FOREIGN KEY (anggota_id) REFERENCES anggota(anggota_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE kartu (
  kartu_id INT AUTO_INCREMENT PRIMARY KEY,
  nomor_kartu VARCHAR(40) NOT NULL,
  tanggal_terbit DATE NOT NULL,
  masa_berlaku DATE NOT NULL,
  anggota_id INT NOT NULL,
  CONSTRAINT uq_kartu_nomor UNIQUE (nomor_kartu),
  CONSTRAINT uq_kartu_anggota UNIQUE (anggota_id),
  CONSTRAINT fk_kartu_anggota FOREIGN KEY (anggota_id) REFERENCES anggota(anggota_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE peminjaman (
  peminjaman_id INT AUTO_INCREMENT PRIMARY KEY,
  anggota_id INT NOT NULL,
  tanggal_pinjam DATE NOT NULL,
  tanggal_jatuh_tempo DATE NOT NULL,
  CONSTRAINT chk_tanggal_jatuh_tempo CHECK (tanggal_jatuh_tempo >= tanggal_pinjam),
  CONSTRAINT fk_peminjaman_anggota FOREIGN KEY (anggota_id) REFERENCES anggota(anggota_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE detail_peminjaman (
  peminjaman_id INT NOT NULL,
  buku_id INT NOT NULL,
  tanggal_kembali DATE NULL,
  denda DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (peminjaman_id, buku_id),
  CONSTRAINT chk_detail_denda CHECK (denda >= 0),
  CONSTRAINT fk_detail_peminjaman FOREIGN KEY (peminjaman_id) REFERENCES peminjaman(peminjaman_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_detail_buku FOREIGN KEY (buku_id) REFERENCES buku(buku_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Verifikasi
SHOW TABLES;
DESCRIBE buku;
SHOW CREATE TABLE detail_peminjaman;
