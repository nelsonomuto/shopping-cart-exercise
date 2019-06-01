import { shallow } from "enzyme"
import React from "react"
import Header from "../../src/components/header"
import { useCart } from "../../src/store/cart/useCart"

const mockState = {
  items: [
    {
      sku: "fake-sku",
      title: "fake-title",
      price: 999.99,
      image: "fake-image-url",
      qty: 4,
    },
  ],
}

jest.mock("../../src/store/cart/useCart.js", () => ({
  useCart: jest.fn(),
}))

describe("<Header />", () => {
  it("matches snapshot", () => {
    useCart.mockImplementationOnce(() => [mockState])
    const component = shallow(<Header siteTitle="TEST" />)
    expect(component).toMatchSnapshot()
  })
})
