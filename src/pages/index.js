import React from "react"
import Layout from "../components/layout"
import ProductList from "../components/product/product-list"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Products" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Products</h1>
    <ProductList />
  </Layout>
)

export default IndexPage
