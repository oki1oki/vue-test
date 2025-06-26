import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IPhoto {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string
}

export const usePhotoStore = defineStore('photoStore', () => {
  const photos = ref<IPhoto[]>([])
  const filteredPhotos = ref<IPhoto[]>([])

  const PHOTO_LIMIT = 30
  const visiblePhotos = ref(PHOTO_LIMIT)

  const isLoading = ref(false)

  // Получение данных
  async function fetchPhotos(albumIds: number[] = []) {
    try {
      isLoading.value = true

      const baseUrl = 'https://jsonplaceholder.typicode.com/photos'
      const url =
        albumIds.length !== 0
          ? `${baseUrl}?${albumIds.map((id) => `albumId=${id}`).join('&')}`
          : baseUrl

      const res = await fetch(url)
      const data = await res.json()

      photos.value = data
      filteredPhotos.value = [...data]
      visiblePhotos.value = PHOTO_LIMIT
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  function sortPhotos(key: keyof IPhoto, asc = true) {
    visiblePhotos.value = PHOTO_LIMIT

    filteredPhotos.value.sort((a, b) => {
      if (a[key] < b[key]) return asc ? -1 : 1
      if (a[key] > b[key]) return asc ? 1 : -1
      return 0
    })
  }

  return { photos, filteredPhotos, visiblePhotos, PHOTO_LIMIT, isLoading, fetchPhotos, sortPhotos }
})
