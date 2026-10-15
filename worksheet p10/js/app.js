// P10 - Perakit aplikasi: mengambil data dari api.js dan menyerahkannya ke dom.js.
import { ambilProyek } from './api.js';
import { render, pasangFilter, aturMemuat, tampilkanGalat, initReview } from './dom.js';

const profil = {
    nama: 'Nuzula Firmansyah',
    peran: 'Mahasiswa Informatika yang belajar front-end',
    topik: 'MARVEL STUDIOS',
    deskripsi: 'Marvel Studios adalah studio yang memproduksi berbagai film dan serial superhero.',
    keahlian: ['HTML', 'CSS', 'JavaScript', 'Responsive Web']
};

function isiProfil() {
    document.title = profil.topik;
    document.querySelector('#nama-halaman').textContent = profil.topik;
    document.querySelector('#deskripsi').textContent = profil.deskripsi;
    document.querySelector('#judul-profil').textContent = `Profil ${profil.nama}`;
    document.querySelector('#kalimat-perkenalan').textContent = `${profil.nama} — ${profil.peran}`;
    document.querySelector('#keahlian').textContent = profil.keahlian.join(' · ');
    document.querySelector('#ringkasan-selesai').textContent = 'Data film dimuat dari berkas JSON melalui fetch.';
    initReview();
}

async function muat() {
    aturMemuat(true);
    try {
        const daftar = await ambilProyek();
        document.querySelector('#jumlah-proyek').textContent = String(daftar.length);
        pasangFilter(daftar);
        render(daftar);
    } catch (galat) {
        tampilkanGalat('Data gagal dimuat. Periksa koneksi atau alamat data, lalu muat ulang halaman.');
        console.error(galat.message);
    } finally {
        aturMemuat(false);
    }
}

isiProfil();
muat();
