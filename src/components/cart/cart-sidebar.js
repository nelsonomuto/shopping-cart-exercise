import { Link } from "gatsby"
import React, { useEffect, useRef } from "react"
import { dollars } from "../../services/formatString"
import { toggleCartOpen } from "../../store/cart/actions"
import { useCart } from "../../store/cart/useCart"
import CartList from "./cart-list"
import CartPortal from "./cart-portal"

const CartSidebar = () => {
  const [{ isCartOpen, items, summary }, dispatch] = useCart()
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
        className={
          "cart-portal-container" +
          (isCartOpen ? " cart-animate-open" : " cart-animate-closed")
        }
      >
        <div className="cart-sidebar-container" ref={containerRef}>
          <button className="cart-portal-close-button" onClick={toggleCart} />
          <div className="cart-sidebar-items-container">
            <h1>Cart</h1>
            <CartList onShop={toggleCart} />
          </div>
          <div className="cart-sidebar-summary-container">
            <div className="cart-subtotal">
              <div className="cart-subtotal-label">Subtotal:</div>
              <div className="cart-subtotal-amt">
                {dollars(summary.subtotal)}
              </div>
            </div>
            {items.length > 0 && (
              <Link to="/checkout" className="cart-checkout-button">
                Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </CartPortal>
  )
}

export default CartSidebar
