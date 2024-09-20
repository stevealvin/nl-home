// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: 'NL Home',
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@vueuse/nuxt'
  ],
  content: {
    markdown: {
      anchorLinks: false
    }
  },
  // ssr: false,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})