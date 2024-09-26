<script setup>
import { RouterLink } from 'vue-router'
import { h } from 'vue'

const menuOptions = [
  {
    label: () => h(
        RouterLink,
        {
          to: {
            path: '/clipboard'
          }
        },
        { default: () => '剪切板' }
      ),
    key: 'clipboard',
  },
  {
    label: 'JSON工具',
    key: 'json',
  },
  {
    label: 'Base64转换',
    key: 'base64',
  },
]
</script>

<template>
  <n-space>
    <div class="w-52">
      <n-menu
        :options="menuOptions"
      />
    </div>
    <div>
      <NuxtPage />
    </div>
  </n-space>
</template>