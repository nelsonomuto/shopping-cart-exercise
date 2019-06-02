import { shallow } from "enzyme"
import React from "react"
import Header from "../../src/components/header"
import { useCart } from "../../src/store/cart/useCart"
import { toggleCartOpen } from "../../src/store/cart/actions"
const { getDefaultState } = jest.requireActual("../../src/store/cart/useCart")

const mockState = getDefaultState({
  items: [
    {
      sku: "fake-sku",
      title: "fake-title",
      price: 999.99,
      image: "fake-image-url",
      qty: 4,
    },
  ],
})

const mockDispatch = jest.fn()
jest.mock("../../src/store/cart/useCart.js", () => ({
  useCart: jest.fn(),
}))

describe("<Header />", () => {
  it("matches snapshot", () => {
    useCart.mockImplementationOnce(() => [mockState])
    const component = shallow(<Header siteTitle="TEST" />)
    expect(component).toMatchSnapshot()
  })

  it("clicking cart button toggles cart", () => {
    useCart.mockImplementationOnce(() => [mockState, mockDispatch])
    const component = shallow(<Header siteTitle="TEST" />)
    const cartButton = component.find(".cart-button")
    cartButton.simulate("click")
    expect(mockDispatch).toHaveBeenCalledWith(toggleCartOpen())
  })
})
