import { shallow } from "enzyme"
import React from "react"
import CartPage from "../../src/pages/cart"

describe("CartPage", () => {
  it("renders cart page component", () => {
    const component = shallow(<CartPage />)
    expect(component).toMatchSnapshot()
  })
})
