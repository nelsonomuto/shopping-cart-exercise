import createContextStore from "../context-reducer-store"
import reducer, { getCartSummary } from "./reducer"

const defaultState = {
  items: [],
  summary: getCartSummary([]),
}

const {
  store,
  StoreProvider: CartStoreProvider,
  useStore: useCart,
} = createContextStore("Cart", reducer, defaultState, {
  // only save items to localstorage, we dont need to save the whole cart state
  serializeStore: state => {
    return { items: state.items }
  },
  deserializeStore: state => {
    return {
      items: state.items,
      summary: getCartSummary(state.items),
    }
  },
})

export { store }
export { CartStoreProvider }
export { useCart }
