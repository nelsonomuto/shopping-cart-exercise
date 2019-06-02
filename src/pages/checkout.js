import React from "react"
import "../assets/css/checkout.css"
import CheckoutCart from "../components/cart/checkout-cart"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { CartStoreProvider } from "../store/cart/useCart"

const CheckoutPage = () => (
  <CartStoreProvider>
    <Layout>
      <SEO title="Checkout" />
      <h1>Checkout</h1>
      <CheckoutCart />
    </Layout>
  </CartStoreProvider>
)

export default CheckoutPage
