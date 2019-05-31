import React from "react"
import renderer from "react-test-renderer"
import CartPage from "../../src/pages/cart"
import { getCartSummary } from "../../src/store/cart/reducer"
import { useCart } from "../../src/store/cart/useCart"

const mockState = {
  items: [
    {
      sku: "fake-sku",
      title: "fake-title",
      price: 999.99,
      image: "fake-image-url",
      qty: 1,
    },
  ],
}
mockState.summary = getCartSummary(mockState.items)

const mockDispatch = jest.fn()
jest.mock("../../src/store/cart/useCart", () => ({
  useCart: jest.fn().mockImplementation(() => {
    return [mockState, mockDispatch]
  }),
}))

describe("CartPage", () => {
  beforeEach(() => {
    useCart.mockClear()
  })

  it("renders items in cart", () => {
    const tree = renderer.create(<CartPage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
