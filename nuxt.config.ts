import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      title: 'NL Home',
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    'motion-v/nuxt',
  ],
  content: {
    renderer: {
      anchorLinks: false,
    },
  },
  // ssr: false,
  css: ['~/assets/css/main.css'],
  devServer: {
    port: 5000,
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  nitro: {
    prerender: {
      failOnError: true,
    }
  }
})