export const profil={nama:'Nuzula Firmansyah',peran:'Mahasiswa yang belajar pengembangan web',topik:'MARVEL STUDIOS',deskripsi:'Marvel Studios adalah studio yang memproduksi berbagai film dan serial superhero.',keahlian:['HTML','CSS','JavaScript','Responsive Web']};
export function buatPerkenalan({nama,peran}){return `${nama} — ${peran}`;}
export const formatKeahlian=daftar=>daftar.join(' · ');
export function saring(daftar,kategori){return daftar.filter(p=>kategori==='semua'||p.kategori===kategori);}
