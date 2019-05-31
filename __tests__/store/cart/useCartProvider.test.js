import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { addProductToCart } from "../../../src/store/cart/actions"
import store from "../../../src/store/cart/persistentStore"
import { CartStoreProvider, useCart } from "../../../src/store/cart/useCart"

const getReducerHook = (Provider, useHook) => {
  let callCursor = -1
  const mockFn = jest.fn().mockImplementation(() => {
    callCursor++
  })

  const ReducerHookComponent = ({ callback }) => {
    const [state, dispatch] = useHook()
    // pass the state and dispatch back up
    // so we can use them directly in tests
    callback(state, dispatch)
    return null
  }

  mount(
    <Provider>
      <ReducerHookComponent callback={mockFn} />
    </Provider>
  )

  return {
    callback: mockFn,
    getState: () => mockFn.mock.calls[callCursor][0],
    getDispatch: () => mockFn.mock.calls[callCursor][1],
  }
}

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
    act(() => {
      dispatch(addProductToCart(mockItem))
    })
    const nextState = hook.getState()
    expect(nextState.items).toEqual([mockItem])
  })
})
