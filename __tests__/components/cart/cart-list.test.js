import { mount, shallow } from "enzyme"
import React from "react"
import CartItem from "../../../src/components/cart/cart-item"
import CartList from "../../../src/components/cart/cart-list"
import { useCart } from "../../../src/store/cart/useCart"
import ConfirmationButton from "../../../src/components/confirmation-button"
import { clearCart } from "../../../src/store/cart/actions"

const { getDefaultState } = jest.requireActual(
  "../../../src/store/cart/useCart"
)

const mockProduct = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
}

const mockItem = {
  ...mockProduct,
  qty: 1,
}

const mockState = getDefaultState({ items: [mockItem] })

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
    useCart.mockImplementationOnce(() => [mockState, mockDispatch])
    const component = mount(<CartList />)
    // click the clear cart button > confirmation
    component
      .find(ConfirmationButton)
      .find("button")
      .simulate("click")
    component.update()
    // confirmation > click on confirm button
    component
      .find(ConfirmationButton)
      .find("button")
      .at(1)
      .simulate("click")
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
