import { mount, shallow } from "enzyme"
import React from "react"
import CartItem from "../../../src/components/cart/cart-item"
import CartList from "../../../src/components/cart/cart-list"
import store from "../../../src/store/cart/store"

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
    store.clear()
  })

  it("renders items from localstorage in cart", () => {
    store.set(mockItems)
    const component = shallow(<CartList />)
    expect(component.find(CartItem)).toHaveLength(1)
    expect(component).toMatchSnapshot()
  })

  it("clear cart button clears items in localstorage", () => {
    store.set(mockItems)
    const component = mount(<CartList />)
    const button = component.find(".cart-list-clear-button")
    button.simulate("click")
    expect(store.get()).toEqual([])
  })
})
