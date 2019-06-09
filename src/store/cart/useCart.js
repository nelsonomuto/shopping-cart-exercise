import createContextStore from "../context-reducer-store"
import reducer, { getCartSummary } from "./reducer"

export const getDefaultState = (override = {}) => ({
  items: [],
  summary: getCartSummary(override.items || []),
  isCartOpen: false,
  ...override,
})

export const serializeStore = state => {
  return { items: state.items }
}

export const deserializeStore = fromStore => {
  return {
    items: fromStore.items,
    ...getDefaultState(fromStore),
  }
}

const {
  store,
  connectStore,
  StoreProvider: CartStoreProvider,
  useStore: useCart,
} = createContextStore("Cart", reducer, getDefaultState(), {
  // only save `items` to localstorage, we dont need to save the whole cart state
  serializeStore,
  deserializeStore,
})

export { store }
export { CartStoreProvider }
export { useCart }
export { connectStore }
