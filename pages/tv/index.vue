<script setup lang="ts">

const categoryList = [
  {
    name: 'jav',
    href: '/tv/jav',
  },
  {
    name: 'anime',
    href: '/tv/anime',
  },
  {
    name: 'movie',
    href: '/tv/movie',
  },
  {
    name: 'variety',
    href: '/tv/variety',
  },
  {
    name: 'documentary',
    href: '/tv/documentary',
  },
  {
    name: 'cartoon',
    href: '/tv/cartoon',
  },
]
const slug = useRoute().params.slug as string
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex">
      <div class="flex-2"></div>
      <UCarousel v-slot="{ item }" auto-height :items="categoryList" class="flex-3 rounded-2xl overflow-clip">
        <!-- <img :src="item.cover" class="h-90 w-full object-cover rounded-2xl"> -->
        <!-- <div class="absolute inset-0 flex justify-center items-center z-10 bg-black opacity-10"></div> -->
      </UCarousel>
    </div>
    <div>
      <div class="grid grid-cols-6 gap-6">
        <template v-for="item in categoryList">
          <div class="bg-gray-500 rounded-2xl p-3">
            <div class="text-center">{{ item.name }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>