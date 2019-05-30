import React from "react"
import CartItem from "./cart-item"

const CartList = () => {
  const [state, dispatch] = useCart()

  return (
    <div className="cart-list">
      <ul>
        {state.items.map(item => (
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
