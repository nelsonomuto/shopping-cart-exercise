import React, { createContext, useContext, useEffect, useReducer } from "react"
import store from "./persistentStore"
import reducer, { getCartSummary } from "./reducer"

// Create a "global" context to store our redux state in
const CartStoreContext = createContext()

// Use this to wrap the whole portion of the app that needs access to cart
export const CartStoreProvider = ({ children }) => {
  const initialState = { items: store.get() }
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <CartStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </CartStoreContext.Provider>
  )
}

// Use this to access cart state and dispatch functions, like useReducer
// except it is available locally anywhere under the Provider wrapper
export const useCart = () => {
  const { state, dispatch } = useContext(CartStoreContext)

  useEffect(() => {
    store.set(state.items)
  }, [state])

  const nextState = { ...state, summary: getCartSummary(state.items) }
  console.log({ nextState })

  return [nextState, dispatch]
}
