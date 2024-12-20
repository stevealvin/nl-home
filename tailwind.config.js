/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'body': 'var(--body-bg)',
        'container': 'var(--container-bg)',
        'hover': 'var(--hover-bg)'
      },
      textColor: {
        'text': 'var(--text-color)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

