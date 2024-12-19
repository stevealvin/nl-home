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
  { name: '主页', href: '/', icon: 'ph:airplay' },
  { name: '在线工具', href: '/tools', icon: 'ph:diamonds-four' },
  { name: '内容', href: '/content', icon: 'ph:notebook' }, 
  { name: '壁纸', href: '#', icon: 'ph:image' },
]
</script>

<template>
  <div class="flex h-screen p-3 gap-3">
    <div class="p-3 flex flex-col w-20 flex-shrink-0 justify-center bg-white rounded-md">
      <div class="flex-shrink-0 flex gap-2 justify-center">
        <img class="h-8 w-8" src="/icon.png" />
        <!-- <span class="ml-2 text-2xl font-bold text-gray-900">NL Tools</span> -->
      </div>
      <div class="flex-1 flex flex-col gap-2 py-4">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          :class="[
            'rounded-md px-3 py-2 hover:bg-[#f9f9ff]',
            currRoute == item.href ? 'text-[#335eea]' : '',
          ]"
        >
          <div class="flex flex-col items-center gap-1">
            <UIcon :name="item.icon" class="w-6 h-6" />
            <!-- {{ item.name }} -->
          </div>
        </a>
      </div>
      <div class="text-center">
        <UButton
          :icon="isDark ? 'i-ph-arrow-line-right' : 'i-ph-arrow-line-left'"
          color="gray"
          variant="ghost"
          @click="isDark = !isDark"
        />
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          color="gray"
          variant="ghost"
          @click="isDark = !isDark"
        />
      </div>
    </div>
    
    <main class="flex-1 overflow-auto bg-white rounded-md">
      <NuxtPage />
    </main>
    
  </div>
</template>
