import { shallow } from "enzyme"
import React from "react"
import CartItem from "../../../src/components/cart/cart-item"
import CartList from "../../../src/components/cart/cart-list"
import { LOCALSTORAGE_CART_KEY } from "../../../src/store/cart/store"

const mockItems = [
  {
    sku: "fake-sku",
    title: "fake-title",
    price: 999.99,
    image: "fake-image-url",
    qty: 1,
  },
]

describe("<CartList />", () => {
  afterEach(() => {
    window.localStorage.removeItem(LOCALSTORAGE_CART_KEY)
  })

  it("renders items from localstorage in cart", () => {
    window.localStorage.setItem(
      LOCALSTORAGE_CART_KEY,
      JSON.stringify(mockItems)
    )
    const component = shallow(<CartList />)
    expect(component.find(CartItem)).toHaveLength(1)
    expect(component).toMatchSnapshot()
  })

  it("clear cart button clears items in localstorage", () => {
    const component = shallow(<CartList />)
    const button = component.find(".cart-list-clear-button")
    button.simulate("click")
    expect(window.localStorage.getItem(LOCALSTORAGE_CART_KEY)).toBe("[]")
  })
})
