import React from "react"
import CartItem from "./cart-item"

const CartList = () => {
  const [state, dispatch] = useCart()

  return (
    <div className="cart-list">
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
    </div>
  )
}

export default CartList
