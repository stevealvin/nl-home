import { defineStore } from 'pinia'
import { ls } from '@/utils/store'

const LOCAL_KEY = 'app_settings'

export const useAppStore = defineStore('app-store', {
  state: () => {
    let data = {
      siderCollapsed: false,
      theme: 'light',
    }
    let localStore = ls.get(LOCAL_KEY)
    if (localStore) {
      localStore = JSON.parse(localStore)
      data = { ...data, ...localStore }
    }
    return data
  },
  actions: {
    setSiderCollapsed(collapsed: boolean) {
      this.siderCollapsed = collapsed
      this.setLocalStore()
    },

    changeSiderCollapsed() {
      this.setSiderCollapsed(!this.siderCollapsed)
    },
    
    setTheme(mode: string) {
      this.theme = mode
      // if (mode == 'dark') {
      //   document.documentElement.classList.add('dark')
      // } else {
      //   document.documentElement.classList.remove('dark')
      // }
      this.setLocalStore()
    },

    changeTheme() {
      this.setTheme(this.theme == 'light' ? 'dark' : 'light')
    },

    setLocalStore() {
      ls.set(LOCAL_KEY, JSON.stringify(this.$state))
    }
  },
})