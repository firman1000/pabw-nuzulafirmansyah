<script setup>
import { reactive, ref } from 'vue'
const nama = ref(''); const email = ref(''); const isi = ref(''); const rating = ref(''); const status = ref('')
const ulasan = reactive([])
function kirim() {
  if (!nama.value.trim() || !email.value.trim() || !isi.value.trim() || !rating.value) { status.value = 'Lengkapi nama, email, rating, dan ulasan.'; return }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { status.value = 'Format email belum benar.'; return }
  ulasan.unshift({ id: Date.now(), nama: nama.value.trim(), email: email.value.trim(), isi: isi.value.trim(), rating: Number(rating.value) })
  nama.value = ''; email.value = ''; isi.value = ''; rating.value = ''; status.value = 'Ulasan berhasil ditambahkan.'
}
</script>

<template>
  <section id="ulasan" class="panel panel-kontak">
    <div class="judul-bagian"><div><p class="eyebrow">BAGIKAN PENGALAMANMU</p><h2>Tulis Ulasan</h2></div><span class="nomor-bagian">04 / ULASAN</span></div>
    <p class="deskripsi-form">Berikan rating dan ulasanmu. Semua kolom wajib diisi.</p>
    <form id="form-ulasan" @submit.prevent="kirim"><div class="form-grid">
      <div class="form-field"><label for="nama-pengirim">Nama</label><input id="nama-pengirim" v-model="nama" type="text" autocomplete="name" placeholder="Nama lengkap" required /></div>
      <div class="form-field"><label for="email-pengirim">Email</label><input id="email-pengirim" v-model="email" type="email" autocomplete="email" placeholder="nama@email.com" required /></div>
      <fieldset class="form-field form-field-penuh rating-field"><legend>Rating</legend><div class="rating-bintang" role="radiogroup" aria-label="Pilih rating dari 1 sampai 5 bintang"><template v-for="n in [5,4,3,2,1]" :key="n"><input :id="`rating-${n}`" v-model="rating" name="rating" type="radio" :value="String(n)" required /><label :for="`rating-${n}`" :aria-label="`${n} bintang`">★</label></template></div></fieldset>
      <div class="form-field form-field-penuh"><label for="isi-ulasan">Ulasan</label><textarea id="isi-ulasan" v-model="isi" rows="4" placeholder="Tuliskan ulasanmu di sini..." required></textarea></div>
    </div><button id="tombol-kirim" type="submit">Kirim ulasan <span aria-hidden="true">→</span></button><p id="status-form" role="status" aria-live="polite">{{ status }}</p></form>
  </section>
  <section id="ulasan-terkirim" class="panel panel-ulasan-terkirim" aria-labelledby="judul-ulasan-terkirim"><div class="judul-bagian"><div><p class="eyebrow">ULASAN TERKIRIM</p><h2 id="judul-ulasan-terkirim">Ulasan terkirim</h2></div><span class="nomor-bagian">05 / ULASAN</span></div>
    <p v-if="ulasan.length === 0" class="ulasan-kosong">Belum ada ulasan yang terkirim.</p><div class="daftar-ulasan" aria-live="polite"><article v-for="item in ulasan" :key="item.id" class="ulasan-item"><h3>{{ item.nama }} · ★ {{ item.rating }}</h3><p>{{ item.isi }}</p></article></div>
  </section>
</template>
