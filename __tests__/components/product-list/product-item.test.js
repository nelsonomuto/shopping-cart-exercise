import { shallow } from "enzyme"
import React from "react"
import ProductItem from "../../../src/components/product/product-item"
import { addProductToCart } from "../../../src/store/cart/actions"
import { useCart } from "../../../src/store/cart/useCart"

const mockProduct = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
}

// Mock useCart which is required in the component.
// Don't test that side effects from useCart actually happen,
// just test that dispatch is called where needed and that
// the original state gets rendered.
const mockDispatch = jest.fn()
jest.mock("../../../src/store/cart/useCart.js", () => ({
  useCart: jest.fn(),
}))

describe("<ProductItem />", () => {
  beforeEach(() => {
    useCart.mockImplementationOnce(() => [{}, mockDispatch])
  })

  it("renders product item from product", () => {
    const component = shallow(<ProductItem {...mockProduct} />)
    expect(component).toMatchSnapshot()
  })

  it("adds item to cart", () => {
    const component = shallow(<ProductItem {...mockProduct} />)
    const addButton = component.find("#add-to-cart")
    addButton.simulate("click")
    expect(mockDispatch).toHaveBeenCalledWith(addProductToCart(mockProduct))
  })
})
