import { Link } from "gatsby"
import React from "react"
import { clearCart } from "../../store/cart/actions"
import { connectStore } from "../../store/cart/useCart"
import ConfirmationButton from "../confirmation-button"
import CartItem from "./cart-item"

export const CartList = ({ onShop, items, clearCart }) => {
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
      <ConfirmationButton onConfirm={() => dispatch(clearCart())}>
        Clear Cart
      </ConfirmationButton>
    </div>
  )
}

export default connectStore(({ items }) => ({ items }), { clearCart })(CartList)
