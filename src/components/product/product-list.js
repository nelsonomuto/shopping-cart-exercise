import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import "../../assets/css/components/product/product-list.css"
import { useCart } from "../../services/cartService"

const ProductList = () => {
  const { allDataJson } = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              products {
                sku
                title
                price
                image
              }
            }
          }
        }
      }
    `
  )

  const { addItem } = useCart()

  const Product = product => (
    <div
      className="product cell small-12 grid-x grid-margin-x"
      id={product.sku}
    >
      <div className="product-image cell small-2">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-title cell small-4">{product.title}</div>
      <div className="product-sku cell small-2">{product.sku}</div>
      <div className="product-price cell small-2">${product.price}</div>
      <div className="product-add-to-cart cell small-2">
        <button id="add-to-cart" onClick={() => addItem(product)}>
          {" "}
          Add to Cart
        </button>
      </div>
    </div>
  )

  return (
    <div className="product-list grid-x grid-margin-y">
      {allDataJson.edges[0].node.products.map(product => (
        <Product {...product} key={product.sku} />
      ))}
    </div>
  )
}
export default ProductList
