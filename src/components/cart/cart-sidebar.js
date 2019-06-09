import { Link } from "gatsby"
import React, { useRef } from "react"
import { dollars } from "../../services/formatString"
import { toggleCartOpen } from "../../store/cart/actions"
import { connectStore } from "../../store/cart/useCart"
import CartList from "./cart-list"
import CartPortal from "./cart-portal"
import { useOnClickOutside } from "../../services/useClickOutside"

const CartSidebar = ({ isCartOpen, items, summary, toggleCartOpen }) => {
  const containerRef = useRef(null)
  useOnClickOutside(containerRef, toggleCartOpen)

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

export default connectStore(null, { toggleCartOpen })(CartSidebar)
