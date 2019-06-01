import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { toggleCartOpen } from "../store/cart/actions"
import { useCart } from "../store/cart/useCart"

const Header = ({ siteTitle }) => {
  const [{ items }, dispatch] = useCart()

  const itemCount = items.reduce((acc, item) => acc + item.qty, 0)

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem`,
        }}
      >
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
          <button
            onClick={() => {
              dispatch(toggleCartOpen())
            }}
            className="cart-button"
          >
            CART ({itemCount})
          </button>
        </h1>
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
