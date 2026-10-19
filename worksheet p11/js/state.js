// P11: satu objek state, fungsi pengubah, dan localStorage.
import {render} from './dom.js';
const KUNCI='pabw-p11',VERSI=2;
export const state={daftarProyek:[],kategoriAktif:'semua',favorit:[]};
export function isiProyek(daftar){state.daftarProyek=Array.isArray(daftar)?daftar:[];render(state);}
export function pilihKategori(nilai){state.kategoriAktif=nilai||'semua';simpan(state);render(state);}
export function tambahFavorit(id){state.favorit=state.favorit.includes(id)?state.favorit.filter(x=>x!==id):[...state.favorit,id];simpan(state);render(state);}
export function simpan(s){try{localStorage.setItem(KUNCI,JSON.stringify({versi:VERSI,kategoriAktif:s.kategoriAktif,favorit:s.favorit}));}catch(e){console.warn('Pilihan tidak dapat disimpan.',e);}}
export function muat(){try{const teks=localStorage.getItem(KUNCI);if(teks===null)return null;const isi=JSON.parse(teks);if(isi?.versi!==VERSI||typeof isi.kategoriAktif!=='string'||!Array.isArray(isi.favorit)){localStorage.removeItem(KUNCI);return null;}return isi;}catch{localStorage.removeItem(KUNCI);return null;}}
export function pulihkan(isi){if(!isi)return;state.kategoriAktif=isi.kategoriAktif;state.favorit=isi.favorit.filter(Number.isFinite);}
export function aturUlang(){localStorage.removeItem(KUNCI);state.kategoriAktif='semua';state.favorit=[];render(state);}
