export default function createPersistentStore(key, defaultState) {
  const setLocalStorage = content => {
    localStorage.setItem(key, JSON.stringify(content))
  }

  const getLocalStorage = () => {
    if (!localStorage.getItem(key)) {
      setLocalStorage(defaultState || {})
    }

    return JSON.parse(localStorage.getItem(key))
  }

  const clearStorage = () => localStorage.removeItem(key)

  const store = {
    get: getLocalStorage,
    set: setLocalStorage,
    clear: clearStorage,
  }

  return store
}
