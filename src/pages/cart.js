import React from "react"
import "../assets/css/cart.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { dollars } from "../services/formatString"
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeProductFromCart,
} from "../store/cart/actions"
import { useCart } from "../store/cart/useCart"

const CartItem = ({ item, onRemove, onIncrement, onDecrement }) => (
  <div>
    <h4 className="cart-item-title">{item.title}</h4>
    <div className="cart-item-controls">
      <button className="cart-item-update-qty-button" onClick={onDecrement}>
        -
      </button>
      <span className="cart-item-qty">{item.qty}</span>
      <button className="cart-item-update-qty-button" onClick={onIncrement}>
        +
      </button>
      <button className="cart-item-remove-button" onClick={onRemove}>
        Remove Item
      </button>
    </div>
  </div>
)

const Cart = () => {
  const [state, dispatch] = useCart()

  return (
    <Layout>
      <SEO title="Cart" />
      <h1>Cart</h1>
      <ul>
        {state.items.map(item => (
          <li key={item.sku}>
            <CartItem
              item={item}
              onRemove={() => dispatch(removeProductFromCart(item))}
              onIncrement={() => dispatch(incrementQuantity(item))}
              onDecrement={() => dispatch(decrementQuantity(item))}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      <div className="cart-summary">
        <div>Subtotal: {dollars(state.summary.subtotal)}</div>
        <div>Tax: {dollars(state.summary.totalTax)}</div>
        <div>
          Shipping:{" "}
          {state.summary.shippingCost === 0
            ? "FREE"
            : dollars(state.summary.shippingCost)}
        </div>
        <div>Total: {dollars(state.summary.totalCost)}</div>
      </div>
    </Layout>
  )
}

export default Cart
