<script setup lang="ts">
import meitu from '~/assets/json/meitu.json'

let route = useRoute()
let index = route.query.i as string
let currIndex = Number(index ?? 1) - 1
const list = meitu?.[currIndex]?.images

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="columns-3 gap-0">
      <template v-for="item in list">
        <NuxtImg
          :src="item.img"
          loading="lazy"
          fit="cover"
          format="webp"
          class="w-full min-h-100 rounded-lg p-1"
        />
      </template>
    </div>
  </div>
</template>