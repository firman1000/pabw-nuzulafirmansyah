<script setup>
const props = defineProps({ profil: { type: Object, required: true }, jumlahProyek: { type: Number, default: 0 } })
</script>

<template>
    <header class="hero">
      <nav class="navigasi" aria-label="Navigasi utama">
        <a class="merek" href="#home" aria-label="Marvel Studios, ke beranda">
          <span class="merek-markah" aria-hidden="true">M</span>
          <span>MARVEL <strong>STUDIOS</strong></span>
        </a>
        <div class="navigasi-tautan">
          <a href="#home">BERANDA</a>
          <a href="#daftar-film">DAFTAR FILM</a>
          <a href="#karakter-pameran">KARAKTER</a>
          <a href="#ulasan">ULASAN</a>
        </div>
      </nav>
      <div class="hero-konten">
        <p class="eyebrow">UNIVERSE OF HEROES</p>
        <h1 id="nama-halaman">{{ profil.topik }}</h1>
        <p id="deskripsi">{{ profil.deskripsi }}</p>
        <a class="tombol-hero" href="#daftar-film">Jelajahi koleksi <span aria-hidden="true">↓</span></a>
      </div>
      <span class="hero-aksen" aria-hidden="true">MARVEL CINEMATIC UNIVERSE</span>
    </header>
    <main id="home">
      <section id="profil" class="kartu-profil">
        <div class="profil-identitas">
          <p class="eyebrow">TENTANG HALAMAN INI</p>
          <h2>Profil {{ props.profil.nama }}</h2>
          <p>{{ props.profil.nama }} — {{ props.profil.peran }}</p>
        </div>
        <div class="profil-statistik">
          <div class="statistik"><span class="label-statistik">KEAHLIAN</span><strong>{{ props.profil.keahlian.join(' · ') }}</strong></div>
          <div class="statistik"><span class="label-statistik">JUMLAH PROYEK</span><strong>{{ props.jumlahProyek ?? 0 }}</strong></div>
        </div>
      </section>
    </main>
</template>
