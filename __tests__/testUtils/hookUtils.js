import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"

export const getReducerHook = (Provider, useHook) => {
  let callCursor = -1
  const mockFn = jest.fn().mockImplementation(() => {
    callCursor++
  })

  const ReducerHookComponent = ({ callback }) => {
    const [state, dispatch] = useHook()
    callback(state, dispatch)
    return null
  }

  mount(
    <Provider>
      <ReducerHookComponent callback={mockFn} />
    </Provider>
  )

  return {
    callback: mockFn,
    getState: () => mockFn.mock.calls[callCursor][0],
    getDispatch: () => action => {
      act(() => {
        mockFn.mock.calls[callCursor][1](action)
      })
    },
  }
}
