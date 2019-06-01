import { getCartSummary } from "../../../src/store/cart/reducer"
import {
  deserializeStore,
  serializeStore,
} from "../../../src/store/cart/useCart"

const mockItem = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
  qty: 1,
}
const reducerState = {
  items: [mockItem],
  summary: getCartSummary([mockItem]),
}
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
