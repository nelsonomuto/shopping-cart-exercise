import actions from "./actions"

const TAX_RATE = 0.1
const SHIPPING_COST_PER_ITEM = 5
const SHIPPING_COST_FLAT = 50
const SHIPPING_COST_RATE = 0.02

// Look up a product in the shopping cart by SKU
const findItem = (product, cartItems) =>
  cartItems.find(_item => _item.sku === product.sku)

const addProductToCart = (state, { product }) => {
  const foundItem = findItem(product, state.items)
  // if item exists, update the qty
  if (foundItem) {
    return incrementQuantity(state, { product })
  }
  // if new cart item, use qty 1
  const newItem = {
    ...product,
    qty: 1,
  }
  return {
    ...state,
    items: state.items.concat(newItem),
  }
}

const removeProductFromCart = (state, { product }) => {
  const foundItem = findItem(product, state.items)
  if (!foundItem) return state

  // item exists; remove it from the saved items
  const nextItems = state.items.filter(_item => _item !== foundItem)
  return {
    ...state,
    items: nextItems,
  }
}

const clearCart = state => {
  return {
    ...state,
    items: [],
  }
}

const updateCartItem = (state, foundItem, updates) => {
  const nextItem = {
    ...foundItem,
    ...updates,
  }
  const currentIndex = state.items.indexOf(foundItem)
  const nextItems = [...state.items]
  nextItems[currentIndex] = nextItem
  return {
    ...state,
    items: nextItems,
  }
}

const incrementQuantity = (state, { product }) => {
  const foundItem = findItem(product, state.items)
  if (!foundItem) return state
  return updateCartItem(state, foundItem, { qty: foundItem.qty + 1 })
}

const decrementQuantity = (state, { product }) => {
  const foundItem = findItem(product, state.items)
  if (!foundItem) return state
  const nextQty = foundItem.qty - 1
  if (nextQty <= 0) return removeProductFromCart(state, { product })
  return updateCartItem(state, foundItem, { qty: nextQty })
}

const toggleCartOpen = state => {
  return {
    ...state,
    isCartOpen: !state.isCartOpen,
  }
}

const reducer = (state, action) => {
  const _state = (() => {
    switch (action.type) {
      case actions.INCREMENT_QUANTITY:
        return incrementQuantity(state, action)
      case actions.DECREMENT_QUANTITY:
        return decrementQuantity(state, action)
      case actions.ADD_PRODUCT_TO_CART:
        return addProductToCart(state, action)
      case actions.REMOVE_PRODUCT_FROM_CART:
        return removeProductFromCart(state, action)
      case actions.CLEAR_CART:
        return clearCart(state)
      case actions.TOGGLE_CART_OPEN:
        return toggleCartOpen(state)
      default:
        return state
    }
  })()

  return {
    ..._state,
    summary: getCartSummary(_state.items),
  }
}

export const getCartSummary = cartItems => {
  const subtotal = cartItems.reduce(
    (acc, value) => acc + value.price * value.qty,
    0
  )
  const totalTax = subtotal * TAX_RATE
  const totalQuantity = cartItems.reduce((acc, value) => acc + value.qty, 0)
  const calculatedShipping =
    SHIPPING_COST_FLAT +
    subtotal * SHIPPING_COST_RATE -
    SHIPPING_COST_PER_ITEM * totalQuantity
  const shippingCost = calculatedShipping > 0 ? calculatedShipping : 0
  const totalCost = subtotal + totalTax + shippingCost

  return {
    subtotal,
    totalTax,
    shippingCost,
    totalCost,
  }
}

export default reducer
