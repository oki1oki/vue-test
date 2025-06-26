<template>
  <div
    ref="tableContainer"
    class="size-[600px] overflow-auto rounded border border-gray-200 dark:border-gray-700"
  >
    <table class="w-full table-fixed text-left text-sm">
      <thead
        class="sticky top-0 z-10 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        <tr>
          <th
            v-for="col in columns"
            :key="col.value"
            class="cursor-pointer p-2 select-none"
            @click="sortBy(col.value)"
          >
            {{ col.label }}
            <span v-if="sortKey === col.value">
              {{ sortAsc ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="photoStore.isLoading">
          <tr v-for="n in photoStore.PHOTO_LIMIT" :key="n" class="animate-pulse">
            <td v-for="col in columns" :key="col.value" class="h-4 rounded p-2">
              <div class="h-4 w-full rounded bg-gray-300"></div>
            </td>
          </tr>
        </template>

        <template v-else>
          <tr
            v-for="photo in photos.slice(0, visiblePhotos)"
            :key="photo.id"
            class="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td v-for="col in columns" :key="col.value">
              <TooltipProvider>
                <Tooltip :delay-duration="1500">
                  <TooltipTrigger class="w-full truncate p-2 text-left">{{
                    photo[col.value]
                  }}</TooltipTrigger>
                  <TooltipContent align="start">
                    <p>{{ photo[col.value] }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import { usePhotoStore, type IPhoto } from '@/stores/photo'
import { storeToRefs } from 'pinia'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const photoStore = usePhotoStore()
const { visiblePhotos } = storeToRefs(photoStore)
const photos = computed(() => photoStore.filteredPhotos)
const tableContainer = ref<HTMLElement | null>(null)

const columns: { value: keyof IPhoto; label: string }[] = [
  { value: 'id', label: 'ID' },
  { value: 'albumId', label: 'Альбом' },
  { value: 'title', label: 'Название' },
  { value: 'url', label: 'Ссылка' },
  { value: 'thumbnailUrl', label: 'Миниатюра' },
]

useInfiniteScroll(
  tableContainer,
  () => {
    if (visiblePhotos.value < photos.value.length) {
      visiblePhotos.value += photoStore.PHOTO_LIMIT
    }
  },
  { distance: 100, canLoadMore: () => visiblePhotos.value < photos.value.length },
)

const sortKey = ref<keyof IPhoto>('id')
const sortAsc = ref(true)

function sortBy(key: keyof IPhoto) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }

  scrollToTop()

  photoStore.sortPhotos(key, sortAsc.value)
}

function scrollToTop() {
  tableContainer.value?.scrollTo({
    top: 0,
  })
}

defineExpose({ scrollToTop })
</script>
