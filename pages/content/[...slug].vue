<script setup>
const route = useRoute()
const path = route.params.slug[0]
const { data } = await useAsyncData('page-data', () => queryContent('/' + path).findOne())

const anchorIndex = computed(() => {
  let links = data.value.body.toc.links || []
  let index = links.findIndex(link => `#${link.id}` == route.hash)
  return index > -1 ? index : 0
})
</script>

<template>
  <div class="flex mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <div class="md-body flex-1 prose lg:prose-base">
      <ContentRenderer :value="data">
        <div class="text-2xl font-bold tracking-tight py-3">{{ data.title }}</div>
        <ContentRendererMarkdown :value="data" />
      </ContentRenderer>
    </div>
    <div class="w-32 relative">
      <div class="fixed right-48 top-32 max-xl:hidden">
        <div class="bg-white px-4 rounded border-l">
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