import { shallow } from "enzyme"
import React from "react"
import ProductItem from "../../../src/components/product/product-item"
import ProductList from "../../../src/components/product/product-list"

describe("<ProductList />", () => {
  it("renders product list", () => {
    const component = shallow(<ProductList />)
    expect(component.find(ProductItem)).toHaveLength(1)
    expect(component).toMatchSnapshot()
  })
})
