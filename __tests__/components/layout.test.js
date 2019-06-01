import { shallow } from "enzyme"
import React from "react"
import Layout from "../../src/components/layout"

describe("<Layout />", () => {
  it("matches snapshot", () => {
    const component = shallow(<Layout />)
    expect(component).toMatchSnapshot()
  })
  it("renders children", () => {
    const Child = () => <span>Test</span>
    const component = shallow(
      <Layout>
        <Child />
      </Layout>
    )
    expect(component.contains(<Child />)).toBeTrue
  })
})
