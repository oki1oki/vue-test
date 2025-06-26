<template>
  <Header @search-complete="handleSearchComplete" />

  <main class="flex flex-col items-center justify-center gap-4">
    <PhotoTable ref="tableRef" />
  </main>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import PhotoTable from './components/PhotoTable.vue'
import { ref } from 'vue'

const tableRef = ref()

function handleSearchComplete() {
  tableRef.value.scrollToTop()
}
</script>
