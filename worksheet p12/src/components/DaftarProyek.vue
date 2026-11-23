<script setup>
const props = defineProps({ daftar: { type: Array, required: true }, kategoriAktif: { type: String, required: true }, favorit: { type: Array, required: true }, status: { type: String, required: true }, galat: { type: String, default: '' } })
const emit = defineEmits(['toggle-favorit'])
</script>

<template>
  <section id="daftar-film" class="panel">
    <div class="judul-bagian"><div><p class="eyebrow">JELAJAHI MCU</p><h2>Daftar Film Marvel Studios</h2></div><span class="nomor-bagian" aria-hidden="true">01 / FILM</span></div>
    <p v-if="status === 'memuat'" class="pesan-kosong" role="status">Memuat data film...</p>
    <p v-else-if="status === 'gagal'" class="pesan-kosong" role="alert">{{ galat || 'Data gagal dimuat. Periksa berkas JSON lalu muat ulang halaman.' }}</p>
    <p v-else-if="status === 'kosong'" class="pesan-kosong" role="status">Tidak ada film untuk kategori ini.</p>
    <div v-else class="table-wrap">
      <table><thead><tr><th>No</th><th>Poster</th><th>Judul Film</th><th>Sinopsis</th><th>Tahun Rilis</th><th>Karakter/Rating</th><th>Durasi</th><th>Aksi</th></tr></thead>
        <tbody><tr v-for="(film, i) in daftar" :key="film.id"><th scope="row">{{ i + 1 }}</th><td><div class="poster-film" role="img" :aria-label="`Poster ${film.judul}`" :style="{ backgroundPosition: `${film.poster.kolom * 20}% ${film.poster.baris * 33.333333}%` }"></div></td><td>{{ film.judul }}</td><td>{{ film.deskripsi }}</td><td>{{ film.tahun }}</td><td>{{ film.karakter }} <span class="rating-film">★ {{ Number(film.rating).toFixed(1) }}</span></td><td>{{ film.durasi }} menit</td><td><button type="button" class="favorit" :aria-pressed="String(favorit.includes(film.id))" @click="emit('toggle-favorit', film.id)">{{ favorit.includes(film.id) ? '★ Favorit' : '☆ Favorit' }}</button></td></tr></tbody>
      </table>
    </div>
  </section>
</template>
