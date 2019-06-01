import React from "react"
import createPersistentStore from "./persistentStore"

export default function createContextStore(
  name,
  reducer,
  defaultState,
  options = {}
) {
  // Create a "global" context to store our redux state in
  // this is private, we abstract this away from consumer
  const StoreContext = React.createContext()
  const _store = createPersistentStore(name, defaultState)

  // Set up serializers/deserializers for the store (if you only want to
  // stash part of it, or if you want to encrypt it)
  const self = content => content
  const serialize = options.serializeStore || self
  const deserialize = options.deserializeStore || self
  const store = { clear: _store.clear }
  store.set = content => _store.set(serialize(content))
  store.get = () => deserialize(_store.get())

  // Use this to wrap the whole portion of the app that needs access to the Store
  const StoreProvider = ({ children }) => {
    const initialState = store.get()
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
      <StoreContext.Provider value={{ state, dispatch }}>
        {children}
      </StoreContext.Provider>
    )
  }

  // Use this to access state and dispatch action, like useReducer
  // except it is available locally anywhere under the StoreProvider wrapper
  const useStore = () => {
    const { state, dispatch } = React.useContext(StoreContext)

    React.useEffect(() => {
      store.set(state)
    }, [state])

    return [state, dispatch]
  }

  return {
    store,
    useStore,
    StoreProvider,
  }
}
