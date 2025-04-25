<script setup>
const router = useRouter()
const route = useRoute()
function handleGoto(path) {
  router.push(`/content${path}`)
}
const { data: contentList} = await useAsyncData('content', () => queryCollection('content').all())

function getCover(item) {
  let bodyList = item.body?.value?.flat()
  let img = bodyList.find(item => Array.isArray(item) && item.includes('img'))
  if (img) {
    return img[1].src
  } else {
    return 'https://www.onexiaolaji.cn/RandomPicture/api/?key=qq249663924&class=102&t=' + Math.random().toString(12).substring(2, 10)
  }
}

</script>

<template>
  <div class="flex flex-col gap-4 max-w-7xl m-auto p-4">
    <!-- <ContentRenderer v-if="page" :value="page" /> -->
    <div class="grid grid-cols-2 gap-x-12 gap-y-6">
      <template v-for="item of contentList">
        <div @click="handleGoto(item.path)" class="flex gap-4 p-4 rounded-xl items-center cursor-pointer bg-gray-100">
          <div class="flex-1 flex flex-col gap-1 h-full">
            <div class="text-lg">{{ item.title }}</div>
            <div class="text-[var(--text-color-5)] line-clamp-3">{{ item.description }}</div>
          </div>
          <div class="shrink-0 self-end">
            <NuxtImg :src="getCover(item)" class="h-26 w-40 object-cover rounded" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>