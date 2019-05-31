import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { addProductToCart } from "../../../src/store/cart/actions"
import store from "../../../src/store/cart/persistentStore"
import { CartStoreProvider, useCart } from "../../../src/store/cart/useCart"

const UseCartTestComponent = ({ callback }) => {
  const [state, dispatch] = useCart()
  // pass the state and dispatch back up
  // so we can use them directly in tests
  callback(state, dispatch)
  return null
}

const Cart = ({ callback }) => (
  <CartStoreProvider>
    <UseCartTestComponent callback={callback} />
  </CartStoreProvider>
)

const getHook = callback => {
  mount(<Cart callback={callback} />)
}

const mockItem = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
  qty: 1,
}

describe("CartStoreProvider", () => {
  const mockFn = jest.fn()

  afterEach(() => {
    store.clear()
  })

  it("gets items from store and puts into state", () => {
    store.set([mockItem])
    getHook(mockFn)
    let nextState = mockFn.mock.calls[0][0]
    expect(nextState.items).toEqual([mockItem])
  })

  it("dispatching actions produces correct state", () => {
    getHook(mockFn)
    let dispatch = mockFn.mock.calls[0][1]
    act(() => {
      dispatch(addProductToCart(mockItem))
    })
    let nextState = mockFn.mock.calls[1][0]

    expect(nextState.items).toEqual([mockItem])
  })
})
