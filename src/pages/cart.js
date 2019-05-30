import React from "react"
import "../assets/css/cart.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useCart } from "../services/cartService"
import { dollars } from "../services/formatString"

const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <div>
    <h4 className="cart-item-title">{item.title}</h4>
    <div className="cart-item-controls">
      <button
        className="cart-item-update-qty-button"
        onClick={() => onUpdateQuantity(item, item.qty > 0 ? item.qty - 1 : 0)}
      >
        -
      </button>
      <span className="cart-item-qty">{item.qty}</span>
      <button
        className="cart-item-update-qty-button"
        onClick={() => onUpdateQuantity(item, item.qty + 1)}
      >
        +
      </button>
      <button
        className="cart-item-remove-button"
        onClick={() => onRemove && onRemove(item)}
      >
        Remove Item
      </button>
    </div>
  </div>
)

const Cart = () => {
  const {
    items,
    subtotal,
    totalTax,
    shippingCost,
    totalCost,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart()

  return (
    <Layout>
      <SEO title="Cart" />
      <h1>Cart</h1>
      <ul>
        {items.map(item => (
          <li key={item.sku}>
            <CartItem
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
      <div className="cart-summary">
        <div>Subtotal: {dollars(subtotal)}</div>
        <div>Tax: {dollars(totalTax)}</div>
        <div>
          Shipping: {shippingCost === 0 ? "FREE" : dollars(shippingCost)}
        </div>
        <div>Total: {dollars(totalCost)}</div>
      </div>
    </Layout>
  )
}

export default Cart
