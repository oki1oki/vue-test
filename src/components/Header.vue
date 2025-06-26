<template>
  <header class="mx-auto w-fit py-8 pt-4">
    <h1 class="mb-5 text-center text-3xl">Тестовое</h1>
    <div class="flex items-center gap-4">
      <div class="relative">
        <Input
          v-model="input"
          :disabled="photoStore.isLoading"
          class="w-80"
          placeholder="Номера альбомов через пробел (1 2 3)"
        />
        <button
          v-if="input"
          @click="clearSearch"
          class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        >
          <X />
        </button>
      </div>
      <Button
        @click="handleSearch"
        :disabled="photoStore.isLoading"
        class="group relative w-48 text-center"
        variant="outline"
      >
        <div
          class="bg-primary absolute top-1/2 left-1 z-10 flex w-1/4 -translate-y-1/2 items-center justify-center rounded-sm py-1 duration-500 group-hover:w-[184px]"
        >
          <SearchIcon />
        </div>
        <p class="translate-x-2">Поиск</p>
      </Button>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { SearchIcon } from 'lucide-vue-next'
import { usePhotoStore } from '@/stores/photo'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { useLocalStorage } from '@vueuse/core'
import ThemeToggle from './ThemeToggle.vue'
import { X } from 'lucide-vue-next'

const emit = defineEmits(['search-complete'])
const photoStore = usePhotoStore()

const input = useLocalStorage('albums-ids', '', { mergeDefaults: true })

async function handleSearch() {
  const searchValue = input.value.trim()

  const ids = searchValue
    ? searchValue
        .split(' ')
        .map((id) => +id)
        .filter((id) => !isNaN(id))
    : []

  await photoStore.fetchPhotos(ids)
  emit('search-complete')
}

function clearSearch() {
  input.value = ''
}

onMounted(() => handleSearch())
</script>
