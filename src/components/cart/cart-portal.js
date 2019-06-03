import React from "react"
import { createPortal } from "react-dom"

const cartPortalRoot = document.body

class CartPortal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement("div")
  }

  componentDidMount() {
    cartPortalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    cartPortalRoot.removeChild(this.el)
  }

  render() {
    return createPortal(this.props.children, this.el)
  }
}

export default CartPortal
