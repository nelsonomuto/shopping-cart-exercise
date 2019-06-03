import { mount, shallow } from "enzyme"
import React from "react"
import CartSidebar from "../../../src/components/cart/cart-sidebar"
import { useCart } from "../../../src/store/cart/useCart"
import { toggleCartOpen } from "../../../src/store/cart/actions"
import { act } from "react-dom/test-utils"

const { getDefaultState } = jest.requireActual(
  "../../../src/store/cart/useCart"
)

const mockProduct = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
}

const mockItem = {
  ...mockProduct,
  qty: 1,
}

const mockState = getDefaultState({ items: [mockItem], isCartOpen: true })

// Mock useCart which is required in the component.
// Don't test that side effects from useCart actually happen,
// just test that dispatch is called where needed and that
// the original state gets rendered.
const mockDispatch = jest.fn()
jest.mock("../../../src/store/cart/useCart.js", () => ({
  useCart: jest.fn(),
}))

describe("<CartSidebar />", () => {
  beforeEach(() => {
    useCart.mockImplementation(() => [mockState, mockDispatch])
  })

  afterEach(() => {
    document.addEventListener = jest.fn()
  })

  it("matches snapshot", () => {
    const component = shallow(<CartSidebar />)
    expect(component).toMatchSnapshot()
  })
  it("matches snapshot (not open)", () => {
    useCart.mockImplementation(() => [
      getDefaultState({ items: [mockItem], isCartOpen: false }),
      mockDispatch,
    ])
    const component = shallow(<CartSidebar />)
    expect(component).toMatchSnapshot()
  })

  it("close button closes cart", () => {
    const component = mount(<CartSidebar />)
    const closeButton = component.find(".cart-portal-close-button")
    act(() => {
      closeButton.simulate("click")
    })
    component.update()
    expect(mockDispatch).toHaveBeenCalledWith(toggleCartOpen())
    expect(
      component.find(".cart-portal-container").hasClass(".cart-animate-closed")
    ).toBeTrue
  })

  it("clicking outside closes cart", () => {
    const map = {}
    document.addEventListener.mockImplementationOnce((event, cb) => {
      map[event] = cb
    })
    const component = mount(<CartSidebar />)
    const containerComponent = component.find(".cart-portal-container")
    // simulate click outside
    act(() => {
      map.mousedown({ target: containerComponent.instance() })
    })
    component.update()

    expect(mockDispatch).toHaveBeenCalledWith(toggleCartOpen())
  })

  it("clicking inside doesnt close cart", () => {
    const map = {}
    document.addEventListener.mockImplementationOnce((event, cb) => {
      map[event] = cb
    })
    const component = mount(<CartSidebar />)
    const containerComponent = component.find(".cart-sidebar-container")
    // simulate click outside
    act(() => {
      map.mousedown({ target: containerComponent.instance() })
    })
    component.update()

    expect(mockDispatch).not.toHaveBeenCalledWith(toggleCartOpen())
  })

  it("unmount removes event listener", () => {
    useCart.mockImplementation(() => [
      getDefaultState({ items: [], isCartOpen: true }),
      mockDispatch,
    ])
    const map = {}
    document.removeEventListener = jest.fn()
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })

    const component = mount(<CartSidebar />)

    act(() => {
      component.unmount()
    })
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "mousedown",
      map.mousedown
    )
  })
})

describe("<CartSidebar /> (with no items)", () => {
  it("matches snapshot (empty state)", () => {
    useCart.mockImplementationOnce(() => [
      getDefaultState({ items: [], isCartOpen: true }),
      mockDispatch,
    ])
    const component = shallow(<CartSidebar />)
    expect(component).toMatchSnapshot()
  })
})
