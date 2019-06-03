import createStore from "../../../src/store/context-reducer-store/persistentStore"

const LOCALSTORAGE_STATE_KEY = "__TEST__"

describe("persistent store", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("get() initializes store if empty", () => {
    const store = createStore(LOCALSTORAGE_STATE_KEY, { message: "hi" })
    expect(window.localStorage.getItem(LOCALSTORAGE_STATE_KEY)).toBeNull()
    const result = store.get()
    expect(result.message).toEqual("hi")
    expect(window.localStorage.getItem(LOCALSTORAGE_STATE_KEY)).toBeDefined()
  })

  it("get() returns existing store", () => {
    const mockState = { id: 1 }
    window.localStorage.setItem(
      LOCALSTORAGE_STATE_KEY,
      JSON.stringify(mockState)
    )
    const store = createStore(LOCALSTORAGE_STATE_KEY, { message: "hi" })
    const result = store.get()
    expect(result).toEqual(mockState)
  })

  it("set() persists store to localstorage", () => {
    expect(window.localStorage.getItem(LOCALSTORAGE_STATE_KEY)).toBeNull()
    const mockState = { id: 1 }
    const store = createStore(LOCALSTORAGE_STATE_KEY)
    store.set(mockState)
    expect(window.localStorage.getItem(LOCALSTORAGE_STATE_KEY)).toBeDefined()
    const result = store.get()
    expect(result).toEqual(mockState)
  })

  it("clear() removes the store from localstorage", () => {
    window.localStorage.setItem("other-entry", "1")
    const mockState = { id: 1 }
    const store = createStore(LOCALSTORAGE_STATE_KEY)
    store.set(mockState)
    expect(window.localStorage.getItem(LOCALSTORAGE_STATE_KEY)).toBeDefined()
    store.clear()
    expect(window.localStorage.getItem(LOCALSTORAGE_STATE_KEY)).toBeNull()
    expect(window.localStorage.getItem("other-entry")).toBe("1")
  })
})
