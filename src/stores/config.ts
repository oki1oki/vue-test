import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const theme = useLocalStorage('theme', 'light')

  function handleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  return { theme, handleTheme }
})
