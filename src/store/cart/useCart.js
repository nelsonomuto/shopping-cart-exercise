import createContextStore from "../context-reducer-store"
import reducer from "./reducer"

const {
  store,
  StoreProvider: CartStoreProvider,
  useStore: useCart,
} = createContextStore(
  "Cart",
  reducer,
  { items: [] },
  {
    // only save items to localstorage, we dont need to save the whole cart state
    // serializeStore: ({ items }) => ({ items }),
    serializeStore: state => {
      return { items: state.items }
    },
  }
)

export { store }
export { CartStoreProvider }
export { useCart }
