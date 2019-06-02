import React from "react"
import { dollars } from "../../services/formatString"
import { useCart } from "../../store/cart/useCart"
import { clearCart } from "../../store/cart/actions"
import ConfirmationButton from "../confirmation-button"
import CartList from "./cart-list"
import CartSummary from "./cart-summary"

const CartCheckout = () => {
  const [{ items, summary }, dispatch] = useCart()
  return (
    <>
      <CartList />
      <CartSummary />
      {items.length > 0 ? (
        <ConfirmationButton
          className="confirm-order-button"
          confirmText={`Confirm order for ${dollars(summary.totalCost)}`}
          cancelText="Cancel"
          onConfirm={() => {
            alert("Your order has been confirmed!")
            dispatch(clearCart())
          }}
        >
          Place Order
        </ConfirmationButton>
      ) : null}
    </>
  )
}

export default CartCheckout
