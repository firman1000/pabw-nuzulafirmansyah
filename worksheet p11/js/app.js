import {ambilProyek} from './api.js';
import {isiProfil,aturMemuat,tampilkanGalat} from './dom.js';
import {isiProyek,pulihkan,muat} from './state.js';
import {pasangPendengar} from './events.js';
async function mulai(){isiProfil();pulihkan(muat());pasangPendengar();aturMemuat(true);try{isiProyek(await ambilProyek());}catch(galat){tampilkanGalat('Data gagal dimuat. Periksa koneksi atau alamat data, lalu muat ulang halaman.');console.error(galat.message);}finally{aturMemuat(false);}}
mulai();
