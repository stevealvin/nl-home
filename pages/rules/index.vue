<script setup>
import { list as rules} from '~/assets/json/rules.js'

const router = useRouter()

</script>

<template>
  <div class="max-w-7xl mx-auto p-8">
    <div class="flex flex-col gap-3">
      <template v-for="item in rules">
        <div class="p-3 cursor-pointer">
          <div>
            <div class="text-base font-semibold">{{ item.title }}</div>
            <div class="mt-2 text-sm text-gray-500">{{ item.description }}</div>
          </div>
          <div class="flex gap-4 text-sm mt-2">
            <span>分类：{{ item.category }}</span>
            <span>更新时间：{{ item.updateDate }}</span>
            <span>版本：{{ item.version }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>