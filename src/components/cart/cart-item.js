import React from "react"

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

export default CartItem
