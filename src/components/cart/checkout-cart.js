import React from "react"
import { dollars } from "../../services/formatString"
import { useCart } from "../../store/cart/useCart"
import ConfirmationButton from "../confirmation-button"
import CartList from "./cart-list"
import CartSummary from "./cart-summary"

const CheckoutCart = () => {
  const [{ items, summary }] = useCart()
  return (
    <>
      <CartList />
      <CartSummary />
      {items.length > 0 ? (
        <ConfirmationButton
          className="confirm-order-button"
          confirmText={`Confirm order for ${dollars(summary.totalCost)}`}
          cancelText="Cancel"
          onConfirm={() => alert("Your order has been confirmed!")}
        >
          Place Order
        </ConfirmationButton>
      ) : null}
    </>
  )
}

export default CheckoutCart
