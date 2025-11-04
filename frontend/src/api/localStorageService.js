export const getData = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('localStorage get error', e)
    return null
  }
}

export const saveData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('localStorage save error', e)
  }
}

export const removeData = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.error('localStorage remove error', e)
  }
}
