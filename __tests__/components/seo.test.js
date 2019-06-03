import { shallow } from "enzyme"
import React from "react"
import SEO from "../../src/components/seo"

describe("<SEO />", () => {
  it("matches snapshot", () => {
    const component = shallow(<SEO title="TEST" />)
    expect(component).toMatchSnapshot()
  })
  it("matches snapshot (with keywords)", () => {
    const component = shallow(<SEO title="TEST" keywords={["test"]} />)
    expect(component).toMatchSnapshot()
  })
})
