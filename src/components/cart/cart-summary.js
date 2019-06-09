import React from "react"
import { dollars } from "../../services/formatString"
import { connectStore } from "../../store/cart/useCart"

export const CartSummary = ({ items, summary }) => {
  if (items.length === 0) return null

  return (
    <div className="cart-summary">
      <div className="cart-subtotal">Subtotal: {dollars(summary.subtotal)}</div>
      <div>Tax: {dollars(summary.totalTax)}</div>
      <div>
        Shipping:{" "}
        {summary.shippingCost === 0 ? "FREE" : dollars(summary.shippingCost)}
      </div>
      <div className="cart-summary-total">
        Total: {dollars(summary.totalCost)}
      </div>
    </div>
  )
}

export default connectStore()(CartSummary)
