<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
const colorMode = useColorMode()

const isCollapsed = computed(() => appStore.siderCollapsed)

const isDark = computed(() => colorMode.value === 'dark')

const currRoute = computed(() => {
  return useRoute().path
})

const navigation = [
  { name: '主页', href: '/', icon: 'solar:home-2-bold-duotone' },
  { name: '规则列表', href: '/rules', icon: 'solar:box-minimalistic-bold-duotone' },
  { name: '内容', href: '/content', icon: 'solar:document-text-bold' }, 
  { name: '图片', href: '/gallery', icon: 'solar:gallery-minimalistic-bold' },
  { name: 'TV', href: '/tv', icon: 'solar:video-library-bold-duotone' },
]

function handleSwitchColorModele() {
  document.startViewTransition(() => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  })
}

</script>

<template>
  <div class="flex h-screen p-2 gap-3">
    <div class="flex flex-col" :class="`sider ${isCollapsed ? 'w-40' : 'w-16'}`">
      <div class="flex-shrink-0 flex gap-2 px-3">
        <img class="h-8 w-8" src="/icon.png" />
        <span v-show="isCollapsed" :class="`title ease-in ${isCollapsed ? 'opacity-100' : 'opacity-0'}`">NL</span>
      </div>
      <div class="flex-1 mt-20 flex flex-col gap-6 py-4 px-2">
        <template v-for="item in navigation">
          <UTooltip :text="item.name" :content="{ side: 'right' }">
            <a :href="item.href" :class="[
                'rounded-md hover:bg-hover w-full',
                currRoute == item.href ? 'text-[#335eea]' : '',
              ]"
            >
              <div class="flex justify-start items-center gap-1">
                <UButton :color="currRoute == item.href ? 'neutral' : 'neutral'" :variant="currRoute == item.href ? 'solid' : 'soft'" size="xl" :icon="item.icon" class="rounded-full"></UButton>
                <span v-if="isCollapsed" class="truncate">{{ item.name }}</span>
              </div>
            </a>
          </UTooltip>
        </template>
      </div>
      <div class="flex flex-col gap-3 items-center py-4">
        <ClientOnly>
          <UButton
            :icon="isDark ? 'solar:moon-bold-duotone' : 'solar:sun-2-bold-duotone'"
            color="neutral"
            variant="solid"
            @click="handleSwitchColorModele"
             class="relative overflow-hidden"
          />
        </ClientOnly>
      </div>
    </div>
    
    <main class="flex-auto h-full">
      <div class="app-main h-full p-4 rounded-xl overflow-auto">
        <NuxtPage />
      </div>
    </main>
    
  </div>
</template>

<style scoped>
.sider {
  transition-duration: 300ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sider .title {
  margin-left: calc(var(--spacing) * 2) /* 0.5rem = 8px */;
  font-size: var(--text-2xl) /* 1.5rem = 24px */;
  line-height: var(--tw-leading, var(--text-2xl--line-height) /* calc(2 / 1.5) ≈ 1.3333 */);
  font-weight: 700;
  transition-property: all;
  transition-timing-function: var(--tw-ease, var(--default-transition-timing-function) /* cubic-bezier(0.4, 0, 0.2, 1) */);
  transition-duration: var(--tw-duration, var(--default-transition-duration) /* 150ms */);
}
</style>