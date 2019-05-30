import React from "react"
import { dollars } from "../../services/formatString"
import { useCart } from "../../store/cart/useCart"

const CartSummary = () => {
  const [{ summary }] = useCart()

  return (
    <div className="cart-summary">
      <div>Subtotal: {dollars(summary.subtotal)}</div>
      <div>Tax: {dollars(summary.totalTax)}</div>
      <div>
        Shipping:{" "}
        {summary.shippingCost === 0 ? "FREE" : dollars(summary.shippingCost)}
      </div>
      <div>Total: {dollars(summary.totalCost)}</div>
    </div>
  )
}

export default CartSummary
