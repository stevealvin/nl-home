const LOCAL_KEY = 'app_settings'

export function getAppSettings() {
  const data = localStorage.get(LOCAL_KEY)
  if (data) {
    return JSON.parse(data)
  }
}

export function setAppSettings(data: any) {
  return localStorage.set(LOCAL_KEY, JSON.stringify(data))
}

export function removeToken() {
  return localStorage.remove(LOCAL_KEY)
}
