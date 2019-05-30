import React from "react"
const LOCAL_KEY = "rtg-cart"
const TAX_RATE = 0.1
const SHIPPING_COST_PER_ITEM = 5
const SHIPPING_COST_FLAT = 50
const SHIPPING_COST_RATE = 0.02

const getCartItemsLocalStorage = () => {
  if (!localStorage.getItem(LOCAL_KEY)) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify([]))
  }

  return JSON.parse(localStorage.getItem(LOCAL_KEY))
}

const setCartItemsLocalStorage = cartItems => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(cartItems))
}

export const useCart = () => {
  // cartItems is the main Store of items in your shopping cart.
  // It can be consumed and modified in any React component and will
  // persist the state to localStorage.

  // alternatively, useReducer could be used to manage the cart state
  const [cartItems, setCartItems] = React.useState(getCartItemsLocalStorage())

  // Look up a product in the shopping cart by SKU
  const findItem = product => cartItems.find(_item => _item.sku === product.sku)

  const addCartItem = product => {
    const foundItem = findItem(product)
    // if item exists, update the qty
    if (foundItem) {
      updateCartItemQuantity(product, foundItem.qty + 1)
      return
    }
    // if new cart item, use qty 1
    const newItem = {
      ...product,
      qty: 1,
    }
    setCartItems(cartItems.concat(newItem))
  }

  const removeCartItem = product => {
    const foundItem = findItem(product)
    if (!foundItem) return

    // item exists; remove it from the saved items
    const nextItems = cartItems.filter(_item => _item !== foundItem)
    setCartItems(nextItems)
  }

  const clearCart = () => {
    setCartItems([])
  }

  const updateCartItemQuantity = (productOrItem, qty) => {
    // if we are setting the qty to 0, just remove the item
    if (qty === 0) {
      removeCartItem(productOrItem)
      return
    }

    // if we somehow dont have this item in the cart and we want to change the qty,
    // just add it to the cart (this shouldn't happen but could depending on usage)
    const foundItem = findItem(productOrItem)
    if (!foundItem) {
      addCartItem(productOrItem)
      return
    }

    // item exists in cart; update qty and save items
    const nextItem = {
      ...foundItem,
      qty,
    }
    const currentIndex = cartItems.indexOf(foundItem)
    const nextItems = [...cartItems]
    nextItems[currentIndex] = nextItem
    setCartItems(nextItems)
  }

  // Update the localstorage item any time the cartItems state is updated
  React.useEffect(() => {
    setCartItemsLocalStorage(cartItems)
  }, [cartItems])

  // Calculate cart sumamry totals
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

  // internally, I'm naming the cart items more specifically
  // to easily differentiate between an item in the cart,
  // a product object, and localStorage "item" functions
  return {
    items: cartItems,
    addItem: addCartItem,
    removeItem: removeCartItem,
    updateQuantity: updateCartItemQuantity,
    subtotal,
    totalTax,
    shippingCost,
    totalCost,
    clearCart,
  }
}
