import init from "jooks"
import { addProductToCart } from "../../../src/store/cart/actions"
import store from "../../../src/store/cart/persistentStore"
import { useCart } from "../../../src/store/cart/useCart"

jest.mock("../../../src/store/cart/persistentStore", () => ({
  get: jest.fn().mockImplementation(() => []),
  set: jest.fn(),
}))

describe("useCart hook", () => {
  const mockHook = init(() => useCart())

  it("uses store for initial state", () => {
    mockHook.run()
    expect(store.get).toHaveBeenCalledTimes(1)
  })

  it("updates store after state changes", async () => {
    await mockHook.mount()
    const [, dispatch] = mockHook.run()
    dispatch(addProductToCart({ sku: 1 }))
    await mockHook.wait()
    expect(store.set).toHaveBeenLastCalledWith([{ sku: 1, qty: 1 }])
  })
})
