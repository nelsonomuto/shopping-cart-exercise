import { shallow } from "enzyme"
import React from "react"
import CheckoutPage from "../../src/pages/checkout"

describe("CheckoutPage", () => {
  it("renders checkout page component", () => {
    const component = shallow(<CheckoutPage />)
    expect(component).toMatchSnapshot()
  })
})
