// P10 - Lapisan tampilan DOM. Data diterima melalui argumen, bukan diambil di sini.
const tbody = document.querySelector("#tabel-proyek");
const barisFilter = document.querySelector("#filter");
const pesanKosong = document.querySelector("#pesan-kosong");
const muatEl = document.querySelector("#pesan-muat");

export function aturMemuat(aktif) {
    if (muatEl) muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
    if (tbody) tbody.replaceChildren();
    if (pesanKosong) {
        pesanKosong.textContent = pesan;
        pesanKosong.hidden = false;
    }
}

function buatBaris(proyek, index) {
    const tr = document.createElement("tr");
    const nilai = [
        String(index + 1),
        null,
        proyek.judul,
        proyek.deskripsi,
        String(proyek.tahun),
        proyek.karakter,
        formatDurasi(proyek.durasi),
    ];
    nilai.forEach((teks, kolom) => {
        const td = document.createElement(kolom === 0 ? "th" : "td");
        if (kolom === 0) td.scope = "row";
        if (kolom === 1) {
       
            const poster = document.createElement("div");
            poster.className = "poster-film";
            poster.setAttribute("role", "img");
            poster.setAttribute("aria-label", `Poster film ${proyek.judul}`);
  
            poster.style.backgroundPosition = `${(proyek.poster.kolom / 5) * 100}% ${(proyek.poster.baris / 3) * 100}%`;
            td.append(poster);
        } else {
            td.textContent = teks;
        }
        if (kolom === 5) {
            const rating = document.createElement("span");
            rating.className = "rating-film";
            rating.setAttribute("aria-label", `Rating ${Number(proyek.rating).toFixed(1)} dari 5`);
            rating.textContent = `★ ${Number(proyek.rating).toFixed(1)}`;
            td.append(rating);
        }
        tr.append(td);
    });
    return tr;
}

function formatDurasi(menit) {
    const jam = Math.floor(menit / 60);
    const sisaMenit = menit % 60;
    return `${jam} jam ${sisaMenit} menit (${menit} menit)`;
}

export function render(daftar) {
    tbody.replaceChildren();
    if (!daftar.length) {
        pesanKosong.textContent = "Belum ada film untuk kategori ini.";
        pesanKosong.hidden = false;
        return;
    }
    pesanKosong.hidden = true;
    const fragmen = document.createDocumentFragment();
    daftar.forEach((proyek, index) => fragmen.append(buatBaris(proyek, index)));
    tbody.append(fragmen);
}

export function pasangFilter(daftar) {
    if (!barisFilter) return;
    barisFilter.addEventListener("click", (event) => {
        const tombol = event.target.closest("button");
        if (!tombol || !barisFilter.contains(tombol)) return;
        const kategori = tombol.dataset.kategori;
        barisFilter.querySelectorAll("button").forEach((item) => {
            const aktif = item === tombol;
            item.classList.toggle("aktif", aktif);
            item.setAttribute("aria-pressed", String(aktif));
        });
        render(daftar.filter((p) => kategori === "semua" || p.kategori === kategori));
    });
}

export function initReview() {
const form = document.querySelector("#form-ulasan");
const inputNama = document.querySelector("#nama-pengirim");
const inputEmail = document.querySelector("#email-pengirim");
const inputUlasan = document.querySelector("#isi-ulasan");
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const ratingField = document.querySelector(".rating-field");
const pesanRating = document.querySelector("#galat-rating");
const tombolKirim = document.querySelector("#tombol-kirim");
const statusForm = document.querySelector("#status-form");
const daftarUlasan = document.querySelector("#daftar-ulasan");
const ulasanKosong = document.querySelector("#ulasan-kosong");
const pesanPenyimpanan = document.querySelector("#pesan-penyimpanan");
const kunciPenyimpananUlasan = "marvel-studios-ulasan-v1";

if (!form || !inputNama || !inputEmail || !inputUlasan || !ratingField ||
    !pesanRating || !tombolKirim || !statusForm || !daftarUlasan ||
    !ulasanKosong || !pesanPenyimpanan) {
    throw new Error("Elemen formulir atau daftar ulasan tidak ditemukan. Periksa id di profil.html.");
}

const aturanKolom = [
    { input: inputNama, pesan: document.querySelector("#galat-nama"), cek: (v) => v.length >= 2, bantuan: "Nama wajib diisi minimal 2 karakter." },
    { input: inputEmail, pesan: document.querySelector("#galat-email"), cek: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), bantuan: "Masukkan alamat email yang valid." },
    { input: inputUlasan, pesan: document.querySelector("#galat-ulasan"), cek: (v) => v.length >= 5, bantuan: "Ulasan wajib diisi minimal 5 karakter." },
];

function periksaKolom(aturan) {
    const sah = aturan.cek(aturan.input.value.trim());
    aturan.input.setAttribute("aria-invalid", String(!sah));
    aturan.pesan.textContent = sah ? "" : aturan.bantuan;
    return sah;
}

function periksaSemua() {
    const kolomValid = aturanKolom.map(periksaKolom).every(Boolean);
    const ratingValid = document.querySelector('input[name="rating"]:checked') !== null;
    ratingField.setAttribute("aria-invalid", String(!ratingValid));
    pesanRating.textContent = ratingValid ? "" : "Pilih rating 1 sampai 5 bintang.";
    tombolKirim.disabled = !(kolomValid && ratingValid);
    return kolomValid && ratingValid;
}

function tampilkanGalatPenyimpanan(pesan) {
    pesanPenyimpanan.textContent = pesan;
    pesanPenyimpanan.hidden = false;
}

function bacaUlasanTersimpan() {
    try {
        const tersimpan = window.localStorage.getItem(kunciPenyimpananUlasan);
        if (tersimpan === null) return [];

        const ulasan = JSON.parse(tersimpan);
        const formatSah = Array.isArray(ulasan) && ulasan.every((item) =>
            item &&
            typeof item.id === "string" &&
            typeof item.nama === "string" &&
            Number.isInteger(item.rating) && item.rating >= 1 && item.rating <= 5 &&
            typeof item.isi === "string" &&
            typeof item.dibuatPada === "string" &&
            !Number.isNaN(Date.parse(item.dibuatPada))
        );
        if (!formatSah) throw new Error("Format data ulasan tidak valid.");
        return ulasan;
    } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        tampilkanGalatPenyimpanan(`Ulasan tersimpan tidak dapat dibaca: ${detail}`);
        return null;
    }
}

function buatKartuUlasan(ulasan) {
    const kartu = document.createElement("article");
    kartu.className = "kartu-ulasan";

    const kepala = document.createElement("div");
    kepala.className = "kepala-ulasan";

    const nama = document.createElement("h3");
    nama.textContent = ulasan.nama;

    const rating = document.createElement("p");
    rating.className = "rating-ulasan";
    rating.setAttribute("aria-label", `Rating ${ulasan.rating} dari 5 bintang`);
    rating.textContent = `${"★".repeat(ulasan.rating)}${"☆".repeat(5 - ulasan.rating)} (${ulasan.rating}/5)`;

    const isi = document.createElement("p");
    isi.className = "isi-ulasan";
    isi.textContent = ulasan.isi;

    const tanggal = document.createElement("time");
    tanggal.dateTime = ulasan.dibuatPada;
    tanggal.textContent = new Date(ulasan.dibuatPada).toLocaleString("id-ID");

    const hapus = document.createElement("button");
    hapus.type = "button";
    hapus.className = "hapus-ulasan";
    hapus.textContent = "Hapus ulasan";
    hapus.setAttribute("aria-label", `Hapus ulasan dari ${ulasan.nama}`);
    hapus.addEventListener("click", () => {
        if (!window.confirm(`Hapus ulasan dari ${ulasan.nama}?`)) return;
        hapusUlasan(ulasan.id);
    });

    kepala.append(nama, rating);
    kartu.append(kepala, isi, tanggal, hapus);
    return kartu;
}

function renderUlasanTersimpan() {
    const ulasan = bacaUlasanTersimpan();
    if (ulasan === null) return;

    pesanPenyimpanan.hidden = true;
    daftarUlasan.replaceChildren();
    ulasanKosong.hidden = ulasan.length > 0;
    ulasan
        .slice()
        .reverse()
        .forEach((item) => daftarUlasan.append(buatKartuUlasan(item)));
}

function simpanUlasan(ulasan) {
    try {
        const ulasanTersimpan = bacaUlasanTersimpan();
        if (ulasanTersimpan === null) return false;
        window.localStorage.setItem(
            kunciPenyimpananUlasan,
            JSON.stringify([...ulasanTersimpan, ulasan])
        );
        return true;
    } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        tampilkanGalatPenyimpanan(`Ulasan gagal disimpan di perangkat ini: ${detail}`);
        return false;
    }
}

function hapusUlasan(id) {
    try {
        const ulasanTersimpan = bacaUlasanTersimpan();
        if (ulasanTersimpan === null) return;
        const ulasanDiperbarui = ulasanTersimpan.filter((ulasan) => ulasan.id !== id);
        window.localStorage.setItem(kunciPenyimpananUlasan, JSON.stringify(ulasanDiperbarui));
        pesanPenyimpanan.hidden = true;
        renderUlasanTersimpan();
    } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        tampilkanGalatPenyimpanan(`Ulasan gagal dihapus dari perangkat ini: ${detail}`);
    }
}

aturanKolom.forEach((aturan) => {
    aturan.input.addEventListener("input", () => {
        periksaKolom(aturan);
        tombolKirim.disabled = !(
            aturanKolom.every((item) => item.cek(item.input.value.trim())) &&
            document.querySelector('input[name="rating"]:checked')
        );
        statusForm.textContent = "";
    });
});

ratingInputs.forEach((input) => {
    input.addEventListener("change", () => {
        const ratingValid = document.querySelector('input[name="rating"]:checked') !== null;
        ratingField.setAttribute("aria-invalid", String(!ratingValid));
        pesanRating.textContent = ratingValid ? "" : "Pilih rating 1 sampai 5 bintang.";
        tombolKirim.disabled = !(
            aturanKolom.every((aturan) => aturan.cek(aturan.input.value.trim())) &&
            ratingValid
        );
        statusForm.textContent = "";
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!periksaSemua()) {
        const kolomTidakValid = aturanKolom.find((aturan) => aturan.input.getAttribute("aria-invalid") === "true");
        if (kolomTidakValid) {
            kolomTidakValid.input.focus();
        } else {
            ratingInputs[0]?.focus();
        }
        statusForm.textContent = "";
        return;
    }
    const ratingTerpilih = document.querySelector('input[name="rating"]:checked');
    const ulasanBaru = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        nama: inputNama.value.trim(),
        rating: Number(ratingTerpilih.value),
        isi: inputUlasan.value.trim(),
        dibuatPada: new Date().toISOString(),
    };
    if (!simpanUlasan(ulasanBaru)) {
        statusForm.textContent = "Ulasan belum tersimpan. Periksa pesan penyimpanan di atas.";
        return;
    }
    renderUlasanTersimpan();
    statusForm.textContent = `Terima kasih, ${ulasanBaru.nama}. Ulasanmu berhasil disimpan.`;
    form.reset();
    aturanKolom.forEach((aturan) => {
        aturan.input.setAttribute("aria-invalid", "false");
        aturan.pesan.textContent = "";
    });
    ratingField.setAttribute("aria-invalid", "false");
    pesanRating.textContent = "";
    tombolKirim.disabled = true;
});

window.addEventListener("storage", (event) => {
    if (event.key === kunciPenyimpananUlasan || event.key === null) {
        renderUlasanTersimpan();
    }
});

renderUlasanTersimpan();


}
