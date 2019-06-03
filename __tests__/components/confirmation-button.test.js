import React from "react"
import ReactDOM from "react-dom"
import ConfirmationButton from "../../src/components/confirmation-button"
import { shallow, mount } from "enzyme"
import { act } from "react-dom/test-utils"

describe("<ConfirmationButton />", () => {
  const onConfirm = jest.fn()

  it("matches snapshot", () => {
    const component = shallow(
      <ConfirmationButton onConfirm={onConfirm}>Do Action</ConfirmationButton>
    )
    expect(component).toMatchSnapshot()
  })

  describe("when clicking button", () => {
    let component
    let map
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })

    beforeEach(() => {
      map = {}

      component = mount(
        <div id="test-wrapper">
          <ConfirmationButton onConfirm={onConfirm}>
            Do Action
          </ConfirmationButton>
        </div>
      )

      const button = component.find("button")
      // Trigger the confirmation state
      act(() => {
        button.simulate("click")
      })
      component.update()
    })

    it("shows confirmation buttons and doesnt fire action", () => {
      const buttons = component.find("button")
      expect(buttons).toHaveLength(2)
      expect(buttons.at(0).text()).toEqual("Nevermind")
      expect(buttons.at(1).text()).toEqual("I'm Sure")
      expect(onConfirm).not.toHaveBeenCalled()
    })

    it("clicking outside of button returns to original button state", () => {
      const testWrapper = component.find("#test-wrapper")
      // simulate clicking outside
      act(() => {
        map.mousedown({
          target: ReactDOM.findDOMNode(testWrapper.instance()),
        })
      })
      component.update()

      const button = component.find("button")
      expect(button).toHaveLength(1)
      expect(button.text()).toEqual("Do Action")
    })

    it("(document handler) clicking inside of button doesn't trigger state change", () => {
      const button = component.find("button").at(0)
      // simulate clicking outside
      act(() => {
        map.mousedown({
          target: ReactDOM.findDOMNode(button.instance()),
        })
      })
      component.update()

      const buttons = component.find("button")
      expect(buttons).toHaveLength(2)
      expect(buttons.at(0).text()).toEqual("Nevermind")
      expect(buttons.at(1).text()).toEqual("I'm Sure")
    })

    describe("when confirming", () => {
      beforeEach(() => {
        const confirmButton = component.find("button").at(1)
        act(() => {
          confirmButton.simulate("click")
        })
        component.update()
      })

      it("fires onConfirm function", () => {
        expect(onConfirm).toHaveBeenCalled()
      })
      it("goes back to neutral state", () => {
        const button = component.find("button")
        expect(button).toHaveLength(1)
        expect(button.text()).toEqual("Do Action")
      })
    })

    describe("when cancelling", () => {
      beforeEach(() => {
        const confirmButton = component.find("button").at(0)
        act(() => {
          confirmButton.simulate("click")
        })
        component.update()
      })

      it("doesn't fire onConfirm function", () => {
        expect(onConfirm).not.toHaveBeenCalled()
      })
      it("goes back to neutral state", () => {
        const button = component.find("button")
        expect(button).toHaveLength(1)
        expect(button.text()).toEqual("Do Action")
      })
    })
  })
})
