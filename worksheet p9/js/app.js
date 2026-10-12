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
        kategori: "Avengers",
        selesai: true,
    },
    {
        judul: "Avengers: Endgame",
        tahun: 2019,
        deskripsi: "Para pahlawan berusaha memperbaiki dampak dari peristiwa Infinity War.",
        karakter: "Karakter Avengers",
        kategori: "Avengers",
        selesai: true,
    },
    {
        judul: "Iron Man",
        tahun: 2008,
        deskripsi: "Tony Stark membangun baju zirah dan memulai perjalanannya sebagai Iron Man.",
        karakter: "Iron Man",
        kategori: "Solo",
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


export {
    profil,
    jumlahProyek,
    daftarProyek,
    buatPerkenalan,
    formatKeahlian,
    proyekSelesai,
    filmKatalog,
};
