import React from "react"
import { dollars } from "../../services/formatString"
import {
  decrementQuantity,
  incrementQuantity,
  removeProductFromCart,
} from "../../store/cart/actions"
import { useCart } from "../../store/cart/useCart"

const CartItem = ({ item }) => {
  const [, dispatch] = useCart()
  const onRemove = () => dispatch(removeProductFromCart(item))
  const onIncrement = () => dispatch(incrementQuantity(item))
  const onDecrement = () => dispatch(decrementQuantity(item))

  return (
    <div className="cart-item">
      <span className="cart-item-title">{item.title}</span>
      <span className="cart-item-price">{dollars(item.price)}</span>
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
}

export default CartItem
