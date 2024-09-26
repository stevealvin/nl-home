<script setup lang="ts">
import { website } from '@/db/data/site'

const menus = [
  {
    name: '推荐',
    // icon: FireIcon
  },
  {
    name: '实用·工具',
    // icon: WrenchScrewdriverIcon
  },
  {
    name: '壁纸·图标',
    // icon: PhotoIcon
  },
  {
    name: '影视',
    // icon: PlayCircleIcon
  },
]

function handleGoto(url: string) {
  window.open(url)
}
</script>

<template>
  <div class="flex gap-4 overflow-hidden h-full">
    <div class="h-full w-60 p-4 overflow-auto">
      <template v-for="item in website">
        <a :href="`#${item.name}`" class="p-2 flex gap-3 items-center cursor-pointer hover:bg-[#e7e7e7] transition-all rounded">
          <!-- <component :is="FireIcon" class="w-5 h-5" /> -->
          <div>{{ item.name }}</div>
        </a>
      </template>
    </div>
    <div class="flex-1 overflow-auto">
      <div v-for="tag in website" class="p-4" :id="tag.name">
        <div class="flex items-center gap-2 mb-2">
          <TagIcon class="w-5 h-5" />
          {{ tag.name }}
        </div>
        <div class="grid grid-cols-5 gap-4">
          <template v-for="item in tag.items">
            <div class="flex items-center gap-3 shadow-sm rounded bg-white p-2 cursor-pointer" @click="handleGoto(item.url)">
              <div class="shrink-0">
                <img
                  :src="item.icon"
                  class="rounded w-9 h-9"
                />
              </div>
              <div class="overflow-hidden">
                <div>{{ item.name }}</div>
                <div class="text-sm text-gray-500 truncate">{{ item.description }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

