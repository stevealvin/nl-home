<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

const route = useRoute()
const toast = useToast()
const { copy } = useClipboard()

const state = reactive({
  key: '',
  input: '',
  ttl: 300,
  msg: '',
  loading: false
})
const codeText = ref('')
const qrcode = useQRCode(codeText, {
  errorCorrectionLevel: 'H',
  margin: 3,
})

async function handleRead() {
  if (!state.key) return
  state.input = ''
  state.msg = ''
  state.loading = true
  let data = await $fetch('/api/cache', { method: 'post', body: { key: state.key } })
  state.loading = false
  if (data) {
    state.input = data
  } else {
    state.msg = '不存在内容或已过期'
  }
}
async function handleCopy(text) {
  await copy(text)
  toast.add({ title: '已复制' })
}
async function handleSubmit() {
  if (!state.input) return
  state.loading = true
  let { data } = await useFetch('/api/cache', { method: 'post', body: { value: state.input, ttl: state.ttl } })
  state.loading = false
  codeText.value = location.href + '?k=' + data.value
}

onMounted(() => {
  if (route.query.k) {
    state.key = route.query.k
    handleRead()
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-8">
    <div class="flex gap-8">
      <div class="flex-[2]">
        <div>
          <div class="text-xl mb-4">查看</div>
            <div class="flex gap-2">
              <UInput v-model="state.key" color="primary" placeholder="标识码" class="w-1/2">
              </UInput>
              <UButton type="primary" :loading="state.loading" @click="handleRead">查看</UButton>
            </div>
          <div class="text-red-500 mt-2">{{ state.msg }}</div>
        </div>
        <div class="mt-4">
          <div class="text-xl mb-4">分享</div>
          <UTextarea v-model="state.input" color="primary" :rows="16" placeholder="请输入内容" type="textarea" />
          <div class="mt-3 flex gap-2">
            <UButton color="blue" @click="handleCopy(state.input)">复制</UButton>
            <UButton type="primary" :loading="state.loading" @click="handleSubmit">提交</UButton>
            <USelect
              v-model="state.ttl"
              placeholder="有效期"
              :style="{ width: '120px' }"
              :options="[
                { label: '5分钟', value: 60 * 5 },
                { label: '30分钟', value: 60 * 30 },
                { label: '1小时', value: 60 * 60 },
                { label: '24小时', value: 60 * 60 * 24 },
              ]"
            >
            </USelect>
          </div>
        </div>
        
      </div>
      <div class="flex-[1] flex flex-col justify-center items-start">
        <div v-if="codeText">
          <div>
            <div class="my-3 text-base">分享链接</div>
            <a href="#" class="text-sm text-blue-500" @click="handleCopy(codeText)">{{ codeText }}</a>
          </div>
          <div>
            <div class="my-3 text-base">分享二维码</div>
            <img :src="qrcode" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>