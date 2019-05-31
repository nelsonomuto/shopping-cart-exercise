import React from "react"
import { clearCart } from "../../store/cart/actions"
import { useCart } from "../../store/cart/useCart"
import CartItem from "./cart-item"

const CartList = () => {
  const [state, dispatch] = useCart()

  return (
    <div className="cart-list">
      <ul>
        {state.items.map(item => (
          <li key={item.sku}>
            <CartItem {...item} />
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
