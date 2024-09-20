<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  SunIcon,
  LightBulbIcon
} from '@heroicons/vue/24/outline'
import { useAppStore } from '@/store'
import {
  NTabs,
  NTab,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  darkTheme
} from 'naive-ui'

const appStore = useAppStore()
const isDark = ref(false)

const currRoute = computed(() => {
  return useRoute().path
})

const changeTheme = () => {
  appStore.changeTheme()
}

onMounted(() => {
  if (appStore.theme == 'dark') {
    document?.documentElement.classList.add('dark')
    isDark.value = true
  }
  
  watch(
    () => appStore.theme,
    (theme) => {
      if (theme == 'dark') {
        isDark.value = true
        document?.documentElement.classList.add('dark')
      } else {
        isDark.value = false
        document?.documentElement.classList.remove('dark')
      }
    },
  )
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
  <div class="flex flex-col h-screen dark:bg-[#121212] dark:text-white">
    <n-config-provider :theme="isDark ? darkTheme : null">
      <n-message-provider>
        <n-dialog-provider>
          <nav as="nav">
            <div class="mx-auto px-4 sm:px-6 lg:px-20">
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
                  <div class="w-40">
                    <n-tabs type="segment" size="small" :default-value="appStore.theme" @update:value="changeTheme">
                      <n-tab name="light">
                        <SunIcon class="h-6 w-6" />
                        <span class="group-hover:block">浅色</span>
                      </n-tab>
                      <n-tab name="dark">
                        <SunIcon class="h-6 w-6" />
                        <span class="group-hover:block">深色</span>
                      </n-tab>
                    </n-tabs>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          
          <main class="flex-1 overflow-auto">
            <NuxtPage />
          </main>
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>
