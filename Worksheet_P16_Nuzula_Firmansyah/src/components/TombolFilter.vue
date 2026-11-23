<script setup>
const props = defineProps({ kategoriAktif: { type: String, required: true }, kategori: { type: Array, required: true } })
const emit = defineEmits(['pilih-kategori', 'atur-ulang'])
</script>

<template>
  <div id="filter" class="filter-bar" aria-label="Filter kategori film">
    <button v-for="item in props.kategori" :key="item" type="button" class="filter" :class="{ aktif: props.kategoriAktif === item }" :aria-pressed="String(props.kategoriAktif === item)" @click="emit('pilih-kategori', item)">{{ item === 'semua' ? 'Semua film' : item }}</button>
  </div>
  <button type="button" id="atur-ulang" class="tombol-atur-ulang" @click="emit('atur-ulang')">Atur ulang pilihan</button>
</template>
