<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const currRoute = computed(() => {
  return useRoute().path
})

const navigation = [
  { name: '主页', href: '/', current: true },
  { name: '在线工具', href: '/tools', current: true },
  { name: '壁纸', href: '#', current: false },
  { name: '内容', href: '/content', current: false },
  { name: '导航', href: '/navigation', current: false },
]
</script>

<template>
  <div class="flex flex-col h-screen">
    <nav>
      <div class="max-w-7xl mx-auto">
        <div class="flex h-16 items-center justify-between">
          <div class="flex-shrink-0 flex gap-2">
            <img class="h-8 w-8" src="/icon.png" />
            <span class="ml-2 text-2xl font-bold text-gray-900">NL Tools</span>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  currRoute == item.href ? 'text-[#335eea]' : 'hover:bg-[rgba(209,209,214,0.28)]',
                  'rounded-md px-3 py-2 text-base font-semibold'
                ]"
                :aria-current="currRoute == item.href ? 'page' : undefined"
              >{{ item.name }}</a>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="w-20">
              <UButton
                :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                color="gray"
                variant="ghost"
                aria-label="Theme"
                @click="isDark = !isDark"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="flex-1 overflow-auto">
      <NuxtPage />
    </main>
    
  </div>
</template>
