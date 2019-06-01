import { Link } from "gatsby"
import React from "react"
import { clearCart } from "../../store/cart/actions"
import { useCart } from "../../store/cart/useCart"
import CartItem from "./cart-item"

const CartList = () => {
  const [{ items }, dispatch] = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-list cart-list-empty">
        <h3>
          Your cart is empty. <Link to="/">Shop now</Link>
        </h3>
      </div>
    )
  }

  return (
    <div className="cart-list">
      <ul>
        {items.map(item => (
          <li key={item.sku}>
            <CartItem item={item} />
          </li>
        ))}
      </ul>
      <button
        className="cart-list-clear-button"
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
    </div>
  )
}

export default CartList
