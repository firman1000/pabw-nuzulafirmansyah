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


function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));


const topikAktif = profil.topik ?? "Topik belum ditentukan";
const lokasiPameran = profil.alamat?.kota ?? "Belum ada lokasi pameran";
console.log("Topik:", topikAktif);
console.log("Lokasi:", lokasiPameran);

const judulProyek = daftarProyek.map((proyek) => proyek.judul);
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);
const filmKatalog = daftarProyek.find((proyek) => proyek.judul === "Avengers: Endgame");

console.table(profil.keahlian);
console.table(daftarProyek);
console.table(proyekSelesai);
console.log("Hasil map:", judulProyek);
console.log("Hasil find:", filmKatalog);


const proyekUrut = [...daftarProyek].sort((a, b) => a.tahun - b.tahun);
console.table(proyekUrut);
console.log("Data asli setelah sort tetap:", daftarProyek);


function renderProfil() {
    document.title = profil.topik;
    const namaHalaman = document.querySelector("#nama-halaman");
    const judulProfil = document.querySelector("#judul-profil");
    const deskripsiEl = document.querySelector("#deskripsi");
    const kalimatPerkenalan = document.querySelector("#kalimat-perkenalan");
    const keahlianEl = document.querySelector("#keahlian");
    const jumlahProyekEl = document.querySelector("#jumlah-proyek");
    const tbody = document.querySelector("#tabel-proyek");
    const ringkasanSelesai = document.querySelector("#ringkasan-selesai");
    const hasilFind = document.querySelector("#hasil-find");

    if (!namaHalaman || !judulProfil || !deskripsiEl || !kalimatPerkenalan || !keahlianEl || !jumlahProyekEl || !tbody || !ringkasanSelesai || !hasilFind) {
        return;
    }

    namaHalaman.textContent = profil.topik;
    judulProfil.textContent = `Profil ${profil.nama}`;
    deskripsiEl.textContent = profil.deskripsi;
    kalimatPerkenalan.textContent = buatPerkenalan(profil);
    keahlianEl.textContent = formatKeahlian(profil.keahlian);
    jumlahProyekEl.textContent = jumlahProyek;

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

    ringkasanSelesai.textContent = `${proyekSelesai.length} proyek/film dalam data berstatus selesai.`;
    hasilFind.textContent = `Hasil find: ${filmKatalog?.judul ?? "data tidak ditemukan"}`;
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderProfil);
} else {
    renderProfil();
}
