import React from "react"
import Layout from "../components/layout"
import ProductList from "../components/product/product-list"
import SEO from "../components/seo"
import { CartStoreProvider } from "../store/cart/useCart"

const IndexPage = () => (
  <CartStoreProvider>
    <Layout>
      <SEO title="Products" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Products</h1>
      <ProductList />
    </Layout>
  </CartStoreProvider>
)

export default IndexPage
