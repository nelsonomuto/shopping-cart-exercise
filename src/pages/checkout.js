import React from "react"
import "../assets/css/checkout.css"
import CartCheckout from "../components/cart/cart-checkout"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { CartStoreProvider } from "../store/cart/useCart"

const CheckoutPage = () => (
  <CartStoreProvider>
    <Layout>
      <SEO title="Checkout" />
      <h1>Checkout</h1>
      <CartCheckout />
    </Layout>
  </CartStoreProvider>
)

export default CheckoutPage
