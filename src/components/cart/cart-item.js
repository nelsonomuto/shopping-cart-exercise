import React from "react"
import { dollars } from "../../services/formatString"
import {
  decrementQuantity,
  incrementQuantity,
  removeProductFromCart,
} from "../../store/cart/actions"
import { connectStore } from "../../store/cart/useCart"

export const CartItem = ({
  item,
  incrementQuantity,
  decrementQuantity,
  removeProductFromCart,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-title">{item.title}</div>
        <div className="cart-item-price-row">
          <span className="cart-item-price">{dollars(item.price)}</span>{" "}
          <button
            className="cart-item-remove-button"
            onClick={() => removeProductFromCart(item)}
          >
            remove
          </button>
        </div>
      </div>
      <div className="cart-item-controls">
        <button
          className="cart-item-update-qty-button"
          onClick={() => decrementQuantity(item)}
        >
          -
        </button>
        <span className="cart-item-qty">{item.qty}</span>
        <button
          className="cart-item-update-qty-button"
          onClick={() => incrementQuantity(item)}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default connectStore(null, {
  incrementQuantity,
  decrementQuantity,
  removeProductFromCart,
})(CartItem)
