import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../assets/css/cart.css"
import "../assets/css/header.css"
import { toggleCartOpen } from "../store/cart/actions"
import { useCart } from "../store/cart/useCart"

const Header = ({ siteTitle }) => {
  const [{ items }, dispatch] = useCart()

  const itemCount = items.reduce((acc, item) => acc + item.qty, 0)

  return (
    <header className="app-header">
      <div className="app-header-items">
        <h1 style={{ margin: 0, position: `relative` }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <button
          onClick={() => {
            dispatch(toggleCartOpen())
          }}
          className="cart-button"
        >
          CART
          <span className="cart-button-item-count">{itemCount}</span>
        </button>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
