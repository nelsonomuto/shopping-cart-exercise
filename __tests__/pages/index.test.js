import { shallow } from "enzyme"
import React from "react"
import IndexPage from "../../src/pages/index"

describe("IndexPage", () => {
  it("renders correctly", () => {
    const component = shallow(<IndexPage />)
    expect(component).toMatchSnapshot()
  })
})
