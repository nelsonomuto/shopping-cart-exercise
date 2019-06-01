import {
  deserializeStore,
  getDefaultState,
  serializeStore,
} from "../../../src/store/cart/useCart"

const mockItem = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
  qty: 1,
}
const reducerState = getDefaultState({
  items: [mockItem],
})

const serializedState = {
  items: [mockItem],
}

describe("CartStoreProvider", () => {
  it("serializeStore only saves items", () => {
    const result = serializeStore(reducerState)
    expect(result).toEqual(serializedState)
  })

  it("deserializeStore adds cart sumamry back", () => {
    const result = deserializeStore(serializedState)
    expect(result).toEqual(reducerState)
  })
})
