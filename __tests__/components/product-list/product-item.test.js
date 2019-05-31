import { mount, shallow } from "enzyme"
import React from "react"
import ProductItem from "../../../src/components/product/product-item"
import store from "../../../src/store/cart/store"

const mockCartItems = [
  {
    sku: "fake-sku",
    title: "fake-title",
    price: 999.99,
    image: "fake-image-url",
    qty: 1,
  },
]

const mockProduct = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
}

describe("<ProductItem />", () => {
  afterEach(() => {
    store.clear()
  })

  it("renders product item from product", () => {
    const component = shallow(<ProductItem {...mockProduct} />)
    expect(component).toMatchSnapshot()
  })

  it("adds item to cart", () => {
    const component = mount(<ProductItem {...mockProduct} />)
    const addButton = component.find("#add-to-cart")
    addButton.simulate("click")
    expect(store.get()).toEqual(mockCartItems)
  })
})
