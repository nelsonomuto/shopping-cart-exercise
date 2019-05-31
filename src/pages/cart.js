import React from "react"
import "../assets/css/cart.css"
import CartList from "../components/cart/cart-list"
import CartSummary from "../components/cart/cart-summary"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Cart = () => {
  return (
    <Layout>
      <SEO title="Cart" />
      <h1>Cart</h1>
      <CartList />
      <CartSummary />
    </Layout>
  )
}

export default Cart
