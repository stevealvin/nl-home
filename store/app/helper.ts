const LOCAL_KEY = 'app_settings'

export function getAppSettings() {
  const data = window?.localStorage.get(LOCAL_KEY)
  if (data) {
    return JSON.parse(data)
  }
}

export function setAppSettings(data: any) {
  return window?.localStorage.set(LOCAL_KEY, JSON.stringify(data))
}

export function removeToken() {
  return window?.localStorage.remove(LOCAL_KEY)
}
