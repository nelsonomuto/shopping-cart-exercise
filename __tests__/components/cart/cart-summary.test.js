import { shallow } from "enzyme"
import React from "react"
import CartSummary from "../../../src/components/cart/cart-summary"
import { getCartSummary } from "../../../src/store/cart/reducer"
import { useCart } from "../../../src/store/cart/useCart"

const mockItem = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
  qty: 2,
}

// Mock useCart which is required in the component.
// Don't test that side effects from useCart actually happen,
// just test that dispatch is called where needed and that
// the original state gets rendered.

jest.mock("../../../src/store/cart/useCart.js", () => ({
  useCart: jest.fn(),
}))

describe("<CartSummary />", () => {
  it("matches snapshot", () => {
    useCart.mockImplementationOnce(() => [
      {
        items: [mockItem],
        summary: getCartSummary([mockItem]),
      },
    ])
    const component = shallow(<CartSummary />)
    expect(component).toMatchSnapshot()
  })

  it("is empty when items are empty", () => {
    useCart.mockImplementationOnce(() => [
      {
        items: [],
        summary: getCartSummary([]),
      },
    ])
    const component = shallow(<CartSummary />)
    expect(component).toEqual({})
  })

  it("shows free shipping when shipping cost is 0", () => {
    useCart.mockImplementationOnce(() => [
      {
        items: [mockItem],
        summary: {
          ...getCartSummary([mockItem]),
          shippingCost: 0,
        },
      },
    ])
    const component = shallow(<CartSummary />)
    expect(component).toMatchSnapshot()
  })
})
