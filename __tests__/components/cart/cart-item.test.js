import { mount, shallow } from "enzyme"
import React from "react"
import CartItem from "../../../src/components/cart/cart-item"
import store from "../../../src/store/cart/store"

const mockItem = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
  qty: 2,
}

const mockItem2 = {
  sku: "fake-sku2",
  title: "fake-title2",
  price: 999.99,
  image: "fake-image-url2",
  qty: 1,
}

describe("<CartItem />", () => {
  afterEach(() => {
    store.clear()
  })

  it("renders items from store in cart", () => {
    store.set([mockItem])
    const component = shallow(<CartItem item={mockItem} />)
    expect(component).toMatchSnapshot()
  })

  it("clicking decrement button updates item qty", () => {
    store.set([mockItem])
    const component = mount(<CartItem item={mockItem} />)
    const decrementButton = component.find(".cart-item-update-qty-button").at(0)
    // Trigger quantity update in store on item
    decrementButton.simulate("click")
    // Store should have been updated
    const nextItem = store.get()[0]
    expect(nextItem.qty).toBe(1)
  })

  it("clicking increment button updates item qty", () => {
    store.set([mockItem])
    const component = mount(<CartItem item={mockItem} />)
    const incrementButton = component.find(".cart-item-update-qty-button").at(1)
    // Trigger quantity update in store on item
    incrementButton.simulate("click")
    // Store should have been updated
    const nextItem = store.get()[0]
    expect(nextItem.qty).toBe(3)
  })

  it("clicking remove item removes item from store", () => {
    store.set([mockItem, mockItem2])
    const component = mount(<CartItem item={mockItem} />)
    const removeButton = component.find(".cart-item-remove-button")
    // Trigger item remove on store
    removeButton.simulate("click")
    // Store should have been updated
    const nextStore = store.get()
    expect(nextStore).toEqual([mockItem2])
  })
})
