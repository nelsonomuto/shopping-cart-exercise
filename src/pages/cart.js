import React from "react"
import "../assets/css/cart.css"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Cart = () => {
  return (
    <Layout>
      <SEO title="Cart" />
      <h1>Cart</h1>
      <CartList />
      <CardSummary />
    </Layout>
  )
}

export default Cart
