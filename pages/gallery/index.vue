<script setup lang="ts">
import { motion } from 'motion-v'
import meitu from '~/assets/json/meitu.json'

const categoryList = [
  {
    cover: 'https://imgsa.baidu.com/forum/pic/item/54e736d12f2eb938b7ce5c2990628535e4dd6f4d.jpg'
  },
  {
    cover: 'https://imgsa.baidu.com/forum/pic/item/b899a9014c086e06d533199047087bf40bd1cb56.jpg'
  },
  {
    cover: 'https://imgsa.baidu.com/forum/pic/item/269759ee3d6d55fb6c5d50fd28224f4a21a4dd56.jpg'
  },
]
const slug = useRoute().params.slug as string
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex">
      <UCarousel v-slot="{ item }" auto-height autoplay loop :items="categoryList" :ui="{ item: 'basis-1/2' }" class="flex-4 rounded-2xl overflow-hidden">
        <motion.img
          :initial="{ y: -100 }"
          :animate="{ y: 0 }"
          :src="item.cover"
          class="h-90 w-full object-cover rounded-2xl"
        />
      </UCarousel>
      <!-- <div class="flex-2"></div> -->
    </div>
    <div>
      <div class="grid grid-cols-6 gap-4">
        <template v-for="(item, index) in meitu">
          <div class="rounded-xl overflow-hidden cursor-pointer" @click="$router.push(`/gallery/xiuren?i=${index + 1}`)">
            <div class="relative group">
              <!-- <LayoutGroup> -->
                <motion.div
                  :initial="{ y: -100 }"
                  :animate="{ y: 0 }"
                  :hover="{ scale: 1.2 }"
                  class="aspect-[2/3]"
                >
                  <NuxtImg :src="item.img" format="webp" />
                </motion.div>
                <motion.div
                  class="absolute p-1 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.1))] h-22 group-hover:bottom-0 -bottom-30 transition-all duration-300"
                >
                  <span class="text-white">{{ item.title }}</span>
                </motion.div>
              <!-- </LayoutGroup> -->
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>