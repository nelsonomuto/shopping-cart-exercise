import createContextStore from "../../../src/store/context-reducer-store"
import { getReducerHook } from "../../testUtils/hookUtils"

const STORE_KEY = "__TEST__"
const testAction = () => ({ type: "TEST_ACTION" })
const mockReducer = jest.fn().mockImplementation((state, action) => {
  if (action.type === "TEST_ACTION") return { ...state, tested: true }
  return state
})

describe("createContextStore() with defaults", () => {
  let contextStore
  beforeEach(() => {
    contextStore = createContextStore(STORE_KEY, mockReducer)
  })
  afterEach(() => {
    window.localStorage.clear()
  })

  it("sets localstorage with correct key", () => {
    const { store } = contextStore
    expect(window.localStorage.getItem(STORE_KEY)).not.toExist
    store.set({ test: true })
    expect(window.localStorage.getItem(STORE_KEY)).toExist
  })

  it("sets StoreProvider component display name", () => {
    const { StoreProvider } = contextStore
    expect(StoreProvider.displayName).toEqual(`${STORE_KEY}StoreProvider`)
  })

  it("gets default state from store", () => {
    const { StoreProvider, useStore } = contextStore
    const hook = getReducerHook(StoreProvider, useStore)
    const nextState = hook.getState()
    expect(nextState).toEqual({})
  })

  it("gets items from store and puts into state", () => {
    const { store, StoreProvider, useStore } = contextStore
    store.set({ id: 1 })
    const hook = getReducerHook(StoreProvider, useStore)
    const nextState = hook.getState()
    expect(nextState.id).toEqual(1)
  })

  it("dispatches actions on reducer", () => {
    const { StoreProvider, useStore } = contextStore
    const hook = getReducerHook(StoreProvider, useStore)
    expect(hook.getState()).toEqual({})
    const dispatch = hook.getDispatch()
    const action = { type: "ANY_ACTION" }
    dispatch(action)
    expect(mockReducer).toHaveBeenCalledWith({}, action)
  })

  it("saves state when action is dispatched", () => {
    const { StoreProvider, useStore } = contextStore
    const hook = getReducerHook(StoreProvider, useStore)
    expect(hook.getState()).toEqual({})
    const dispatch = hook.getDispatch()
    dispatch(testAction())
    const state = hook.getState()
    expect(state.tested).toBeTrue
  })
})

describe("createContextStore() with options", () => {
  const defaultState = { id: 1, tested: false }
  const serializeStore = jest.fn().mockImplementation(content => content)
  const deserializeStore = jest.fn().mockImplementation(content => content)
  let contextStore
  beforeEach(() => {
    contextStore = createContextStore(STORE_KEY, mockReducer, defaultState, {
      serializeStore,
      deserializeStore,
    })
  })
  afterEach(() => {
    window.localStorage.clear()
  })

  it("sets default items from store and puts into state", () => {
    const { store, StoreProvider, useStore } = contextStore
    const hook = getReducerHook(StoreProvider, useStore)
    const nextState = hook.getState()
    expect(nextState).toEqual(defaultState)
    expect(store.get()).toEqual(nextState)
  })

  it("dispatching actions produces correct state", () => {
    const { StoreProvider, useStore } = contextStore
    const hook = getReducerHook(StoreProvider, useStore)
    expect(hook.getState().tested).toBeFalse
    const dispatch = hook.getDispatch()
    dispatch(testAction())
    const nextState = hook.getState()
    expect(nextState.tested).toBeTrue
  })

  it("calls serializer when setting store", () => {
    const { store } = contextStore
    store.set({ ...defaultState, tested: true })
    expect(serializeStore).toHaveBeenCalledWith({
      ...defaultState,
      tested: true,
    })
  })

  it("calls deserializer when retrieving store", () => {
    const { store } = contextStore
    store.set({ ...defaultState, tested: true })
    const state = store.get()
    expect(state.tested).toBeTrue
    expect(deserializeStore).toHaveBeenCalledWith({
      ...defaultState,
      tested: true,
    })
  })
})
