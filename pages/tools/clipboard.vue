<script setup>
import {
  NSpace,
  NMenu,
  NInput,
  NButton,
  NInputGroup,
  useMessage,
  NSelect,
  NQrCode
} from 'naive-ui'

const route = useRoute()
const message = useMessage()

const state = reactive({
  key: '',
  input: '',
  ttl: 300,
  result: '',
  msg: '',
  loading: false
})

const { copy } = useClipboard()

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
  message.info('已复制')
}
async function handleSubmit() {
  if (!state.input) return
  state.loading = true
  let { data } = await useFetch('/api/cache', { method: 'post', body: { value: state.input, ttl: state.ttl } })
  state.loading = false
  state.result = location.href + '?k=' + data.value
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
      <div class="flex-1">
        <n-space vertical :size="24">
          <div>
            <div class="text-xl mb-4">查看</div>
            <n-input-group>
              <n-input v-model:value="state.key" placeholder="标识码" :style="{ width: '50%' }" />
              <n-button type="primary" ghost :loading="state.loading" @click="handleRead">查看</n-button>
            </n-input-group>
            <div class="text-red-500 mt-2">{{ state.msg }}</div>
          </div>
          <div>
            <div class="text-xl mb-4">分享</div>
            <n-input v-model:value="state.input" rows="16" placeholder="请输入内容" type="textarea" />
            <n-space class="mt-3">
              <n-button type="info" @click="handleCopy(state.input)">复制</n-button>
              <n-button type="primary" :loading="state.loading" @click="handleSubmit">提交</n-button>
              <n-select
                v-model:value="state.ttl"
                placeholder="有效期"
                :style="{ width: '120px' }"
                :options="[
                  { label: '5分钟', value: 60 * 5 },
                  { label: '30分钟', value: 60 * 30 },
                  { label: '1小时', value: 60 * 60 },
                  { label: '24小时', value: 60 * 60 * 24 },
                ]"
              >
              </n-select>
            </n-space>
          </div>
        </n-space>
      </div>
      <div class="w-40 flex flex-col justify-center items-start">
        <n-space v-if="state.result">
          <div>
            <div class="my-3 text-base">分享链接</div>
            <n-button text type="info" @click="handleCopy(state.result)">{{ state.result }}</n-button>
          </div>
          <div>
            <div class="my-3 text-base">分享二维码</div>
            <n-qr-code :value="state.result" :icon-border-radius="12" padding="0" :size="160" />
          </div>
        </n-space>
      </div>
    </div>
  </div>
</template>