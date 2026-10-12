// P9 - DOM, Event, dan Interaktivitas
// Nama: Nuzula Firmansyah | NIM: 25523137
import {
    profil,
    jumlahProyek,
    daftarProyek,
    buatPerkenalan,
    formatKeahlian,
    proyekSelesai,
    filmKatalog,
} from "./app.js";

const judulHalaman = document.querySelector("#nama-halaman");
const deskripsi = document.querySelector("#deskripsi");
const judulProfil = document.querySelector("#judul-profil");
const perkenalan = document.querySelector("#kalimat-perkenalan");
const keahlian = document.querySelector("#keahlian");
const jumlah = document.querySelector("#jumlah-proyek");
const tbody = document.querySelector("#tabel-proyek");
const barisFilter = document.querySelector("#filter");
const pesanKosong = document.querySelector("#pesan-kosong");
const ringkasanSelesai = document.querySelector("#ringkasan-selesai");
const hasilFind = document.querySelector("#hasil-find");

if (!judulHalaman || !deskripsi || !judulProfil || !perkenalan || !keahlian ||
    !jumlah || !tbody || !barisFilter || !pesanKosong || !ringkasanSelesai || !hasilFind) {
    throw new Error("Elemen halaman tidak ditemukan. Periksa id di profil.html.");
}

document.title = profil.topik;
judulHalaman.textContent = profil.topik;
deskripsi.textContent = profil.deskripsi;
judulProfil.textContent = `Profil ${profil.nama}`;
perkenalan.textContent = buatPerkenalan(profil);
keahlian.textContent = formatKeahlian(profil.keahlian);
jumlah.textContent = jumlahProyek;
ringkasanSelesai.textContent = `${proyekSelesai.length} proyek/film dalam data berstatus selesai.`;
hasilFind.textContent = `Hasil find: ${filmKatalog?.judul ?? "data tidak ditemukan"}`;

function buatBaris(proyek, index) {
    const tr = document.createElement("tr");
    const nilai = [
        String(index + 1),
        proyek.judul,
        proyek.deskripsi,
        String(proyek.tahun),
        proyek.karakter,
        proyek.selesai ? "Selesai" : "Belum selesai",
    ];
    nilai.forEach((teks, kolom) => {
        const td = document.createElement(kolom === 0 ? "th" : "td");
        if (kolom === 0) td.scope = "row";
        td.textContent = teks;
        tr.append(td);
    });
    return tr;
}

function render(daftar) {
    tbody.replaceChildren();
    pesanKosong.hidden = daftar.length !== 0;
    if (daftar.length === 0) return;
    const fragmen = document.createDocumentFragment();
    daftar.forEach((proyek, index) => fragmen.append(buatBaris(proyek, index)));
    tbody.append(fragmen);
}

function tandaiTombolAktif(tombolAktif) {
    barisFilter.querySelectorAll("button").forEach((tombol) => {
        tombol.classList.toggle("aktif", tombol === tombolAktif);
        tombol.setAttribute("aria-pressed", String(tombol === tombolAktif));
    });
}

barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol || !barisFilter.contains(tombol)) return;
    const kategori = tombol.dataset.kategori;
    const terpilih = daftarProyek.filter(
        (proyek) => kategori === "semua" || proyek.kategori === kategori
    );
    tandaiTombolAktif(tombol);
    render(terpilih);
});

render(daftarProyek);


const form = document.querySelector("#form-pesan");
const inputNama = document.querySelector("#nama-pengirim");
const inputEmail = document.querySelector("#email-pengirim");
const inputPesan = document.querySelector("#isi-pesan");
const tombolKirim = document.querySelector("#tombol-kirim");
const statusForm = document.querySelector("#status-form");

const aturanKolom = [
    { input: inputNama, pesan: document.querySelector("#galat-nama"), cek: (v) => v.length >= 2, bantuan: "Nama wajib diisi minimal 2 karakter." },
    { input: inputEmail, pesan: document.querySelector("#galat-email"), cek: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), bantuan: "Masukkan alamat email yang valid." },
    { input: inputPesan, pesan: document.querySelector("#galat-pesan"), cek: (v) => v.length >= 5, bantuan: "Pesan wajib diisi minimal 5 karakter." },
];

function periksaKolom(aturan) {
    const sah = aturan.cek(aturan.input.value.trim());
    aturan.input.setAttribute("aria-invalid", String(!sah));
    aturan.pesan.textContent = sah ? "" : aturan.bantuan;
    return sah;
}

function periksaSemua() {
    const hasil = aturanKolom.map(periksaKolom);
    tombolKirim.disabled = !hasil.every(Boolean);
    return hasil.every(Boolean);
}

aturanKolom.forEach((aturan) => {
    aturan.input.addEventListener("input", () => {
        periksaKolom(aturan);
        tombolKirim.disabled = !aturanKolom.every((item) => item.cek(item.input.value.trim()));
        statusForm.textContent = "";
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!periksaSemua()) {
        aturanKolom.find((aturan) => aturan.input.getAttribute("aria-invalid") === "true")?.input.focus();
        statusForm.textContent = "";
        return;
    }
    statusForm.textContent = `Terima kasih, ${inputNama.value.trim()}. Pesan berhasil divalidasi.`;
    form.reset();
    aturanKolom.forEach((aturan) => {
        aturan.input.setAttribute("aria-invalid", "false");
        aturan.pesan.textContent = "";
    });
    tombolKirim.disabled = true;
});

console.log("P9 DOM aktif:", { jumlahProyek: daftarProyek.length, pemilih: "#tabel-proyek, #filter, #pesan-kosong" });
