import React from "react"
import reducer, { getCartSummary } from "./reducer"
import store from "./store"

export const useCart = () => {
  const initialState = { items: store.get() }
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    store.set(state.items)
  }, [state])

  const nextState = { ...state, summary: getCartSummary(state.items) }
  console.log(nextState)

  return [nextState, dispatch]
}
