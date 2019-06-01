import createContextStore from "../context-reducer-store"
import reducer, { getCartSummary } from "./reducer"

const defaultState = {
  items: [],
  summary: getCartSummary([]),
}

export const serializeStore = state => {
  return { items: state.items }
}

export const deserializeStore = state => {
  return {
    items: state.items,
    summary: getCartSummary(state.items),
  }
}

const {
  store,
  StoreProvider: CartStoreProvider,
  useStore: useCart,
} = createContextStore("Cart", reducer, defaultState, {
  // only save `items` to localstorage, we dont need to save the whole cart state
  serializeStore,
  deserializeStore,
})

export { store }
export { CartStoreProvider }
export { useCart }
