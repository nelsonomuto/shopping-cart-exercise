import init from "jooks"
import { addProductToCart } from "../../../src/store/cart/actions"
import store from "../../../src/store/cart/persistentStore"
import { getCartSummary } from "../../../src/store/cart/reducer"
import { CartStoreContext, useCart } from "../../../src/store/cart/useCart"

jest.mock("../../../src/store/cart/persistentStore", () => ({
  get: jest.fn().mockImplementation(() => []),
  set: jest.fn(),
}))

const mockItem = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
  qty: 1,
}

const mockState = {
  items: [mockItem],
}

describe("useCart hook", () => {
  const mockHook = init(() => useCart())
  const mockDispatch = jest.fn()

  beforeEach(() => {
    mockHook.setContext(CartStoreContext, {
      state: mockState,
      dispatch: mockDispatch,
    })
  })

  it("updates store after state changes", async () => {
    await mockHook.mount()
    const [, dispatch] = mockHook.run()
    dispatch(addProductToCart(mockItem))
    await mockHook.wait()
    expect(store.set).toHaveBeenLastCalledWith(mockState.items)
  })

  it("state includes computed summary", async () => {
    await mockHook.mount()
    const [state] = mockHook.run()
    expect(state.summary).toEqual(getCartSummary(mockState.items))
  })
})
