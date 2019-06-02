import React from "react"
import { dollars } from "../../services/formatString"
import { decrementQuantity, incrementQuantity } from "../../store/cart/actions"
import { useCart } from "../../store/cart/useCart"

const CartItem = ({ item }) => {
  const [, dispatch] = useCart()
  const onIncrement = () => dispatch(incrementQuantity(item))
  const onDecrement = () => dispatch(decrementQuantity(item))

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-title">{item.title}</div>
        <div className="cart-item-price">{dollars(item.price)}</div>
      </div>
      <div className="cart-item-controls">
        <button className="cart-item-update-qty-button" onClick={onDecrement}>
          -
        </button>
        <span className="cart-item-qty">{item.qty}</span>
        <button className="cart-item-update-qty-button" onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  )
}

export default CartItem
