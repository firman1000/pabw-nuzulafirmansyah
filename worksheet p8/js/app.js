// P8 - JavaScript Modern ES6+, Struktur Data, dan Array Methods
// Nama: Nuzula Firmansyah
// NIM: 25523137
// Topik: MARVEL STUDIOS

const profil = {
    nama: "Nuzula Firmansyah",
    peran: "Mahasiswa Informatika yang belajar front-end",
    topik: "MARVEL STUDIOS",
    deskripsi: "Marvel Studios adalah studio yang memproduksi berbagai film dan serial superhero.",
    keahlian: ["HTML", "CSS", "JavaScript", "Responsive Web"],
};

const jumlahProyek = 3;

const daftarProyek = [
    {
        judul: "Avengers: Infinity War",
        tahun: 2018,
        deskripsi: "Para Avengers dan sekutunya berusaha menghentikan Thanos yang mengumpulkan Infinity Stones.",
        karakter: "Karakter Avengers",
        selesai: true,
    },
    {
        judul: "Avengers: Endgame",
        tahun: 2019,
        deskripsi: "Para pahlawan berusaha memperbaiki dampak dari peristiwa Infinity War.",
        karakter: "Karakter Avengers",
        selesai: true,
    },
    {
        judul: "Iron Man",
        tahun: 2008,
        deskripsi: "Tony Stark membangun baju zirah dan memulai perjalanannya sebagai Iron Man.",
        karakter: "Iron Man",
        selesai: true,
    },
];

// Dua fungsi murni: masing-masing hanya bergantung pada argumen dan mengembalikan nilai.
function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

// Nilai bawaan dan akses aman.
const topikAktif = profil.topik ?? "Topik belum ditentukan";
const lokasiPameran = profil.alamat?.kota ?? "Belum ada lokasi pameran";
console.log("Topik:", topikAktif);
console.log("Lokasi:", lokasiPameran);

// Array methods: map, filter, dan find.
const judulProyek = daftarProyek.map((proyek) => proyek.judul);
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);
const filmKatalog = daftarProyek.find((proyek) => proyek.judul === "Avengers: Endgame");

console.table(profil.keahlian);
console.table(daftarProyek);
console.table(proyekSelesai);
console.log("Hasil map:", judulProyek);
console.log("Hasil find:", filmKatalog);

// Salinan diurutkan sehingga data asli tidak berubah.
const proyekUrut = [...daftarProyek].sort((a, b) => a.tahun - b.tahun);
console.table(proyekUrut);
console.log("Data asli setelah sort tetap:", daftarProyek);

// Menampilkan data ke halaman.
document.title = profil.topik;
document.querySelector("#nama-halaman").textContent = profil.topik;
document.querySelector("#judul-profil").textContent = `Profil ${profil.nama}`;
document.querySelector("#deskripsi").textContent = profil.deskripsi;
document.querySelector("#kalimat-perkenalan").textContent = buatPerkenalan(profil);
document.querySelector("#keahlian").textContent = formatKeahlian(profil.keahlian);
document.querySelector("#jumlah-proyek").textContent = jumlahProyek;

const tbody = document.querySelector("#tabel-proyek");
tbody.innerHTML = daftarProyek.map((proyek, index) => `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${proyek.judul}</td>
        <td>${proyek.deskripsi}</td>
        <td>${proyek.tahun}</td>
        <td>${proyek.karakter}</td>
        <td>${proyek.selesai ? "Selesai" : "Belum selesai"}</td>
    </tr>
`).join("");

document.querySelector("#ringkasan-selesai").textContent =
    `${proyekSelesai.length} proyek/film dalam data berstatus selesai.`;

document.querySelector("#hasil-find").textContent =
    `Hasil find: ${filmKatalog?.judul ?? "data tidak ditemukan"}`;
