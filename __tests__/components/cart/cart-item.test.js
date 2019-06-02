import { shallow } from "enzyme"
import React from "react"
import CartItem from "../../../src/components/cart/cart-item"
import {
  decrementQuantity,
  incrementQuantity,
  removeProductFromCart,
} from "../../../src/store/cart/actions"
import { useCart } from "../../../src/store/cart/useCart"

const mockItem = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
}

const mockState = {
  items: [mockItem],
}

// Mock useCart which is required in the component.
// Don't test that side effects from useCart actually happen,
// just test that dispatch is called where needed and that
// the original state gets rendered.
const mockDispatch = jest.fn()
jest.mock("../../../src/store/cart/useCart.js", () => ({
  useCart: jest.fn(),
}))

describe("<CartItem />", () => {
  beforeEach(() => {
    useCart.mockImplementationOnce(() => [mockState, mockDispatch])
  })

  it("matches snapshot", () => {
    const component = shallow(<CartItem item={mockItem} />)
    expect(component).toMatchSnapshot()
  })

  it("clicking decrement button calls decrement action", () => {
    const component = shallow(<CartItem item={mockItem} />)
    const decrementButton = component.find(".cart-item-update-qty-button").at(0)
    decrementButton.simulate("click")
    expect(mockDispatch).toHaveBeenCalledWith(decrementQuantity(mockItem))
  })

  it("clicking increment button calls decrement action", () => {
    const component = shallow(<CartItem item={mockItem} />)
    const incrementButton = component.find(".cart-item-update-qty-button").at(1)
    incrementButton.simulate("click")
    expect(mockDispatch).toHaveBeenCalledWith(incrementQuantity(mockItem))
  })

  it("clicking remove button calls remove action", () => {
    const component = shallow(<CartItem item={mockItem} />)
    const removeButton = component.find(".cart-item-remove-button")
    removeButton.simulate("click")
    expect(mockDispatch).toHaveBeenCalledWith(removeProductFromCart(mockItem))
  })
})
