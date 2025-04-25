<script setup>
const route = useRoute()

const path = route.params.slug[0]
const { data } = await useAsyncData(route.path, () => queryCollection('content').path('/' + path).first())

const anchorIndex = computed(() => {
  let links = data.value.body.toc.links || []
  let index = links.findIndex(link => `#${link.id}` == route.hash)
  return index > -1 ? index : 0
})
</script>

<template>
  <div class="flex py-6 sm:px-6 lg:px-8">
    <div class="md-body prose-lg max-w-5xl mx-auto">
      <div class="text-2xl font-bold tracking-tight py-3">{{ data.title }}</div>
      <ContentRenderer :value="data"></ContentRenderer>
    </div>
    <div class="shrink-0 w-80">
      <div class="sticky right-0 top-32">
        <div class="relative px-4 rounded">
          <div class="absolute w-[1px] h-5 bg-[#4565d8] left-0 transition-all" :style="{
            transform: `translateY(${(anchorIndex) * 28 + 4}px)`
          }"></div>
          <template v-for="item in data.body.toc.links || []">
            <div class="text-sm py-1">
              <a :href="`#${item.id}`">{{ item.text }}</a>  
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.md-body :deep(a){
  color: #336cf9;
  text-decoration: none;
}
</style>