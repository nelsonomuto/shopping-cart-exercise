import { shallow } from "enzyme"
import React from "react"
import SEO from "../../src/components/seo"

describe("<SEO />", () => {
  it("matches snapshot", () => {
    const component = shallow(<SEO title="TEST" />)
    expect(component).toMatchSnapshot()
  })
})
