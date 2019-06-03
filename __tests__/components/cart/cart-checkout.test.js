import { mount, shallow } from "enzyme"
import React from "react"
import CartCheckout from "../../../src/components/cart/cart-checkout"
import { useCart } from "../../../src/store/cart/useCart"
import { clearCart } from "../../../src/store/cart/actions"
import { act } from "react-dom/test-utils"

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

describe("<CartCheckout />", () => {
  jest.spyOn(window, "alert").mockImplementation(() => {})

  beforeEach(() => {
    useCart.mockImplementation(() => [mockState, mockDispatch])
  })

  it("matches snapshot", () => {
    const component = shallow(<CartCheckout />)
    expect(component).toMatchSnapshot()
  })

  it("confirming place order button alerts user and clears cart", () => {
    const component = mount(<CartCheckout />)
    // click the clear cart button > confirmation
    act(() => {
      component
        .find(".confirm-order-button")
        .find("button")
        .simulate("click")
    })
    component.update()
    // confirmation > click on confirm button
    component
      .find(".confirm-order-button")
      .find("button")
      .at(1)
      .simulate("click")

    expect(window.alert).toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith(clearCart())
  })
})

describe("<CartCheckout /> (with no items)", () => {
  it("matches snapshot (empty state)", () => {
    useCart.mockImplementationOnce(() => [{ items: [] }, mockDispatch])
    const component = shallow(<CartCheckout />)
    expect(component).toMatchSnapshot()
  })
})
