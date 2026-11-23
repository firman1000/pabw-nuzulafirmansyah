<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'
import { profil } from './data.js'
import { ambilProyek } from './api.js'

const KUNCI = 'pabw-p12'
const state = reactive({ daftarProyek: [], kategoriAktif: 'semua', favorit: [], status: 'memuat', galat: '' })
const daftarTampil = computed(() => state.daftarProyek.filter(f => state.kategoriAktif === 'semua' || f.kategori === state.kategoriAktif))
const kategoriTersedia = computed(() => ['semua', ...new Set(state.daftarProyek.map(proyek => proyek.kategori))])
const statusTampil = computed(() => state.status === 'memuat' || state.status === 'gagal' ? state.status : (daftarTampil.value.length ? 'berhasil' : 'kosong'))
function pilihKategori(kategori) { state.kategoriAktif = kategori }
function toggleFavorit(id) { state.favorit = state.favorit.includes(id) ? state.favorit.filter(x => x !== id) : [...state.favorit, id] }
function aturUlang() { state.kategoriAktif = 'semua'; state.favorit = [] }
onMounted(async () => {
  try { const saved = JSON.parse(localStorage.getItem(KUNCI) || 'null'); if (saved && saved.versi === 1) { state.kategoriAktif = saved.kategoriAktif || 'semua'; state.favorit = Array.isArray(saved.favorit) ? saved.favorit : [] } } catch { localStorage.removeItem(KUNCI) }
  try {
    state.daftarProyek = await ambilProyek()
    if (!kategoriTersedia.value.includes(state.kategoriAktif)) state.kategoriAktif = 'semua'
    state.status = 'berhasil'
  } catch (error) { state.status = 'gagal'; state.galat = 'Data gagal dimuat. Periksa public/data/proyek.json lalu muat ulang halaman.'; console.error(error) }
})
watch(() => [state.kategoriAktif, state.favorit], () => { try { localStorage.setItem(KUNCI, JSON.stringify({ versi: 1, kategoriAktif: state.kategoriAktif, favorit: state.favorit })) } catch (error) { console.warn('Pilihan tidak dapat disimpan.', error) } }, { deep: true })
</script>

<template>
  <KepalaProfil :profil="profil" :jumlah-proyek="state.daftarProyek.length" />
  <section class="panel">
    <div class="judul-bagian"><div><p class="eyebrow">PILIHANMU</p><h2>Filter Koleksi</h2></div><span class="nomor-bagian">00 / FILTER</span></div>
    <TombolFilter :kategori-aktif="state.kategoriAktif" :kategori="kategoriTersedia" @pilih-kategori="pilihKategori" @atur-ulang="aturUlang" />
  </section>
  <DaftarProyek :daftar="daftarTampil" :kategori-aktif="state.kategoriAktif" :favorit="state.favorit" :status="statusTampil" :galat="state.galat" @toggle-favorit="toggleFavorit" />
  <section id="karakter-pameran" class="panel"><div class="judul-bagian"><div><p class="eyebrow">WAJAH-WAJAH DI BALIK CERITA</p><h2>Karakter &amp; Pameran</h2></div><span class="nomor-bagian">02 / GALERI</span></div>
    <div class="galeri-karakter"><figure><img src="/images/oIfnevRiENDR2IBE31FoFIUWFiMXQgBgGxEk2A~tplv-tiktokx-origin.jpg" alt="Kolase karakter Marvel" loading="lazy"><figcaption>Karakter Marvel <span>01</span></figcaption></figure><figure><img src="/images/images.jpg" alt="Kolase poster film Marvel Studios" loading="lazy"><figcaption>Koleksi poster film Marvel <span>02</span></figcaption></figure><figure><img src="/images/thumb-1920-1286361.jpg" alt="Marvel Cinematic Universe" loading="lazy"><figcaption>Marvel Cinematic Universe <span>03</span></figcaption></figure></div>
    <div class="catatan-galeri"><p>Data film dimuat dari berkas JSON melalui fetch.</p><p>Gunakan filter dan tombol favorit untuk mengubah tampilan.</p></div>
  </section>
  <FormKontak />
  <footer><a class="merek merek-footer" href="#home" aria-label="Kembali ke atas"><span class="merek-markah" aria-hidden="true">M</span><span>MARVEL <strong>STUDIOS</strong></span></a><p>© 2026 MARVEL STUDIOS</p><p>Dibuat oleh Nuzula Firmansyah · NIM 25523137</p></footer>
</template>
