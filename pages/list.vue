<script setup>
const router = useRouter()
const { data: playlist } = await useFetch('/api/list')

function handleClick(url) {
  router.push({path: '/player', query: { url }})
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="item in playlist" class="flex-grow" @click="handleClick(item.url)">
      <img :src="item.logo" />
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>