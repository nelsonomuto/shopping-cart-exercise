import { Link } from "gatsby"
import React from "react"
import { clearCart } from "../../store/cart/actions"
import { useCart } from "../../store/cart/useCart"
import CartItem from "./cart-item"

const CartList = ({ onShop }) => {
  const [{ items }, dispatch] = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-list cart-list-empty">
        <h3>
          Your cart is empty.{" "}
          <Link to="/" onClick={onShop}>
            Shop now
          </Link>
        </h3>
      </div>
    )
  }

  return (
    <div className="cart-list-container">
      <div className="cart-list">
        {items.map(item => (
          <CartItem item={item} key={item.sku} />
        ))}
      </div>
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
