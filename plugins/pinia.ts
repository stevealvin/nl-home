import { setupStore } from '../store'

export default defineNuxtPlugin(nuxtApp => {
  setupStore(nuxtApp.vueApp)
})