import React from "react"
import { dollars } from "../../services/formatString"
import { addProductToCart } from "../../store/cart/actions"
import { useCart } from "../../store/cart/useCart"

const ProductItem = product => {
  const [, dispatch] = useCart()
  return (
    <div
      className="product cell small-12 grid-x grid-margin-x"
      id={product.sku}
    >
      <div className="product-image cell small-2">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-title cell small-4">{product.title}</div>
      <div className="product-sku cell small-2">{product.sku}</div>
      <div className="product-price cell small-2">{dollars(product.price)}</div>
      <div className="product-add-to-cart cell small-2">
        <button
          id="add-to-cart"
          onClick={() => dispatch(addProductToCart(product))}
        >
          {" "}
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductItem
