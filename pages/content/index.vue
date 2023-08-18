<script setup>
const router = useRouter()
function handleGoto(path) {
  router.push(`/content${path}`)
}
</script>

<template>
  <div class="flex flex-col gap-4 max-w-6xl m-auto bg-white p-4">
    <ContentList v-slot="{ list }">
      <template v-for="item of list">
        <div @click="handleGoto(item._path)" class="cursor-pointer p-3 rounded flex gap-4 items-center">
          <div>
            <img src="http://n.huasen.cc/img/3.e53ce5f3.jpeg" class="h-20 rounded" />
          </div>
          <div>
            <div class="text-lg mb-2">{{ item.title }}</div>
            <p class="text-[#999]">{{ item.description }}</p>
          </div>
        </div>
      </template>
    </ContentList>
  </div>
</template>