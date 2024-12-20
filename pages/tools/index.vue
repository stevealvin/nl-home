<script setup>
const router = useRouter()

const tools = [
  {
    name: '在线剪切板',
    path: '/tools/clipboard',
    desc: '快速从电脑复制大段文本、坐标、网址等内容到手机'
  },
  {
    name: 'JSON工具',
    path: '/tools/json',
    desc: 'JSON格式化、转移、压缩'
  },
  {
    name: 'Base64编码',
    path: '/tools/base64',
    desc: 'Base64字符串转换'
  },
  {
    name: 'URL 编码/解码',
    path: '/tools/urlencode',
    desc: '对URL格式的字符串进行编码/解码'
  },
  {
    name: 'Unicode转义',
    path: '/tools/unicode',
    desc: 'Unicode字符进行转义'
  },
]

function goto(url) {
  router.push(url)
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-8">
    <div class="grid grid-cols-4 gap-3">
      <template v-for="item in tools">
        <div class="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#18181c] rounded-md transition-colors duration-300" @click="goto(item.path)">
          <div class="flex items-center gap-2">
            <UIcon name="i-carbon-apps" class="text-blue-500 h-8 w-8" />
            <div class="text-base font-semibold">{{ item.name }}</div>
          </div>
          <div class="mt-2 text-sm text-gray-500">{{ item.desc }}</div>
        </div>
      </template>
    </div>
  </div>
</template>