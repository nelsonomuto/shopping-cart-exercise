import { shallow } from "enzyme"
import React from "react"
import CartItem from "../../../src/components/cart/cart-item"
import CartList from "../../../src/components/cart/cart-list"
import { clearCart } from "../../../src/store/cart/actions"
import { useCart } from "../../../src/store/cart/useCart"

const mockProduct = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
}

const mockState = {
  items: [
    {
      ...mockProduct,
      qty: 1,
    },
  ],
}

// Mock useCart which is required in the component.
// Don't test that side effects from useCart actually happen,
// just test that dispatch is called where needed and that
// the original state gets rendered.
const mockDispatch = jest.fn()
jest.mock("../../../src/store/cart/useCart.js", () => ({
  useCart: jest.fn(),
}))

describe("<CartList />", () => {
  beforeEach(() => {
    useCart.mockImplementationOnce(() => [mockState, mockDispatch])
  })

  it("matches snapshot", () => {
    const component = shallow(<CartList />)
    expect(component).toMatchSnapshot()
  })

  it("renders items from Cart store", () => {
    const component = shallow(<CartList />)
    expect(component.find(CartItem)).toHaveLength(1)
  })

  it("clear cart button dispatches clear cart action", () => {
    const component = shallow(<CartList />)
    const button = component.find(".cart-list-clear-button")
    button.simulate("click")
    expect(mockDispatch).toHaveBeenCalledWith(clearCart())
  })
})

describe("<CartList /> (with no items)", () => {
  it("matches snapshot (empty state)", () => {
    useCart.mockImplementationOnce(() => [{ items: [] }, mockDispatch])
    const component = shallow(<CartList />)
    expect(component).toMatchSnapshot()
  })
})
