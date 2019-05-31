import store, {
  LOCALSTORAGE_CART_KEY,
} from "../../../src/store/cart/persistentStore"

describe("persistent store", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("get() initializes store if empty", () => {
    expect(window.localStorage.getItem(LOCALSTORAGE_CART_KEY)).toBeNull()
    const result = store.get()
    expect(result).toEqual([])
    expect(window.localStorage.getItem(LOCALSTORAGE_CART_KEY)).toBeDefined()
  })

  it("get() returns existing store", () => {
    const cartItems = [{ sku: 1 }]
    window.localStorage.setItem(
      LOCALSTORAGE_CART_KEY,
      JSON.stringify(cartItems)
    )
    const result = store.get()
    expect(result).toEqual(cartItems)
  })

  it("set() adds items to storage", () => {
    expect(window.localStorage.getItem(LOCALSTORAGE_CART_KEY)).toBeNull()
    const cartItems = [{ sku: 1 }]
    store.set(cartItems)
    expect(window.localStorage.getItem(LOCALSTORAGE_CART_KEY)).toBeDefined()
    const result = store.get()
    expect(result).toEqual(cartItems)
  })

  it("clear() removes the store from localstorage", () => {
    window.localStorage.setItem("other-entry", "1")
    const cartItems = [{ sku: 1 }]
    store.set(cartItems)
    expect(window.localStorage.getItem(LOCALSTORAGE_CART_KEY)).toBeDefined()
    store.clear()
    expect(window.localStorage.getItem(LOCALSTORAGE_CART_KEY)).toBeNull()
    expect(window.localStorage.getItem("other-entry")).toBe("1")
  })
})
