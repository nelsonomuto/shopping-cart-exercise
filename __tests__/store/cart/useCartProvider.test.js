import { addProductToCart } from "../../../src/store/cart/actions"
import store from "../../../src/store/cart/persistentStore"
import { CartStoreProvider, useCart } from "../../../src/store/cart/useCart"
import { getReducerHook } from "../../testUtils/hookUtils"

const mockItem = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
  qty: 1,
}

describe("CartStoreProvider", () => {
  afterEach(() => {
    store.clear()
  })

  it("gets items from store and puts into state", () => {
    store.set([mockItem])
    const hook = getReducerHook(CartStoreProvider, useCart)
    const nextState = hook.getState()
    expect(nextState.items).toEqual([mockItem])
  })

  it("dispatching actions produces correct state", () => {
    const hook = getReducerHook(CartStoreProvider, useCart)
    const dispatch = hook.getDispatch()
    dispatch(addProductToCart(mockItem))
    const nextState = hook.getState()
    expect(nextState.items).toEqual([mockItem])
  })
})
