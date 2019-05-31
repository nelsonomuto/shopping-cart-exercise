export const LOCALSTORAGE_CART_KEY = "rtg-cart"

const setCartItemsLocalStorage = cartItems => {
  console.log("setCartItemsLocalStorage")
  localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(cartItems))
}

const getCartItemsLocalStorage = () => {
  if (!localStorage.getItem(LOCALSTORAGE_CART_KEY)) {
    setCartItemsLocalStorage([])
  }

  return JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_KEY))
}

const clearStorage = () => localStorage.removeItem(LOCALSTORAGE_CART_KEY)

const store = {
  get: getCartItemsLocalStorage,
  set: setCartItemsLocalStorage,
  clear: clearStorage,
}

export default store
