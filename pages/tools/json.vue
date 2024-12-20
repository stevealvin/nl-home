<script setup>
const router = useRouter()
const toast = useToast()

const state = reactive({
  input: '',
  loading: false,
})

function handleBeautify() {
  try {
    state.input = JSON.stringify(JSON.parse(state.input), null, 2)
  } catch (e) {
    console.error(e);
    
    toast.add({ title: 'JSON 格式错误', color: 'red' })
  }
}

function handleCompress() {
  try {
    state.input = JSON.stringify(JSON.parse(state.input))
  } catch (e) {
    toast.add({ title: 'JSON 格式错误', color: 'red' })
  }
}

function handleEscape() {
    let text = state.input
    let t = 2

    if (t === 1 || t === 3) {
        // 合并成一行，并去掉空白符
        text = text.replace(/\n/g, ' ').replace(/(\s+)(?=(["']))/g, '')
    }

    // 对于 t 为 2 或 3，处理反斜杠和双引号的转义
    if (t === 2 || t === 3) {
      text = text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    }

    // 对于 t 为 4，还原反斜杠和双引号的转义
    if (t === 4) {
      text = text.replace(/\\\\/g, '\\').replace(/\\"/g, '"')
    }

    state.input = text
}

function handleRestore() {
  state.input = state.input.replace(/\\\\/g, '\\').replace(/\\"/g, '"')
}

function handleUnicodeCh2() {
  let text = state.input.replace(/\\u[\dA-Fa-f]{4}/g, match => {
    return String.fromCharCode(parseInt(match.replace("\\u", ""), 16));
  })
  state.input = text
}

function handleCh2Unicode() {
  let text = state.input.split('')
    .map(char => {
      const code = char.charCodeAt(0)
      // 只转义非 ASCII 字符
      return code > 127 ? `\\u${code.toString(16).padStart(4, '0')}` : char
    })
    .join('')
  state.input = text
}

async function handleCopy() {
  await navigator.clipboard.writeText(state.input)
  toast.add({ title: '已复制' })
}

function goto(url) {
  router.push(url)
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-8">
    <UTextarea v-model="state.input" color="primary" variant="outline" resize :rows="20" />
    <div class="mt-3 flex gap-3">
      <UButton color="blue" @click="handleBeautify">校验/格式化</UButton>
      <UButton @click="handleCompress">压缩</UButton>
      <UButton @click="handleEscape">转义</UButton>
      <UButton @click="handleRestore">去转义</UButton>
      <UButton @click="handleUnicodeCh2">Unicode转中文</UButton>
      <UButton @click="handleCh2Unicode">中文转Unicode</UButton>
      <UButton color="indigo" variant="soft" @click="handleCopy">复制</UButton>
    </div>
  </div>
</template>