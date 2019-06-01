import React from "react"
import "../assets/css/cart.css"
import CartList from "../components/cart/cart-list"
import CartSummary from "../components/cart/cart-summary"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { CartStoreProvider } from "../store/cart/useCart"

const CheckoutPage = () => (
  <CartStoreProvider>
    <Layout>
      <SEO title="Checkout" />
      <h1>Cart</h1>
      <CartList />
      <CartSummary />
    </Layout>
  </CartStoreProvider>
)

export default CheckoutPage
