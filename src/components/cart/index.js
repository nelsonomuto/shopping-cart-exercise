import { Link } from "gatsby"
import React, { useEffect, useRef } from "react"
import { dollars } from "../../services/formatString"
import { toggleCartOpen } from "../../store/cart/actions"
import { useCart } from "../../store/cart/useCart"
import CartList from "./cart-list"
import CartPortal from "./cart-portal"

const Cart = () => {
  const [{ isCartOpen, summary }, dispatch] = useCart()
  const containerRef = useRef(null)

  const toggleCart = () => dispatch(toggleCartOpen())

  const onClickOutside = e => {
    if (containerRef.current.contains(e.target)) {
      // inside
      return
    }
    // outside
    toggleCart()
  }

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener("mousedown", onClickOutside)
      return () => {
        document.removeEventListener("mousedown", onClickOutside)
      }
    } else {
      document.removeEventListener("mousedown", onClickOutside)
    }
  }, [isCartOpen])

  return (
    <CartPortal>
      <div
        onClick={onClickOutside}
        className={
          "cart-portal-container" +
          (isCartOpen ? " cart-animate-open" : " cart-animate-closed")
        }
      >
        <div className="cart-sidebar-container" ref={containerRef}>
          <button className="cart-portal-close-button" onClick={toggleCart}>
            Close
          </button>
          <div className="cart-sidebar-items-container">
            <h1>Cart</h1>
            <CartList onShop={toggleCart} />
          </div>
          <div className="cart-sidebar-summary-container">
            <div className="cart-subtotal">
              Subtotal: {dollars(summary.subtotal)}
            </div>
            <Link to="/checkout" className="cart-checkout-button">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </CartPortal>
  )
}

export default Cart
