<template>
  <Button variant="outline" @click="toggleTheme">
    <Icon
      icon="radix-icons:moon"
      class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
    />
    <Icon
      icon="radix-icons:sun"
      class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import Button from '@/components/ui/Button.vue'

const mode = useColorMode()

function toggleTheme() {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}
</script>
