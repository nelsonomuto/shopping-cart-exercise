const actions = {
  INCREMENT_QUANTITY: "INCREMENT_QUANTITY",
  DECREMENT_QUANTITY: "DECREMENT_QUANTITY",
  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  REMOVE_PRODUCT_FROM_CART: "REMOVE_PRODUCT_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
}

export const incrementQuantity = product => ({
  type: actions.INCREMENT_QUANTITY,
  product,
})

export const decrementQuantity = product => ({
  type: actions.DECREMENT_QUANTITY,
  product,
})

export const addProductToCart = product => ({
  type: actions.ADD_PRODUCT_TO_CART,
  product,
})

export const removeProductFromCart = product => ({
  type: actions.REMOVE_PRODUCT_FROM_CART,
  product,
})

export const clearCart = () => ({
  type: actions.CLEAR_CART,
})

export const toggleCartOpen = () => ({
  type: actions.TOGGLE_CART_OPEN,
})

export default actions
