import {
  addProductToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeProductFromCart,
} from "../../../src/store/cart/actions"
import reducer, { getCartSummary } from "../../../src/store/cart/reducer"

const product = {
  sku: "fake-sku",
  title: "fake-title",
  price: 999.99,
  image: "fake-image-url",
}

const item = {
  ...product,
  qty: 2,
}

const testCases = [
  {
    description: "addProductToCart() adds product to cart",
    actionCreator: addProductToCart,
    args: product,
    state: {
      items: [],
    },
    expectedState: {
      items: [
        {
          ...product,
          qty: 1,
        },
      ],
    },
  },
  {
    description:
      "addProductToCart() increments quantity when product already in cart",
    actionCreator: addProductToCart,
    args: product,
    state: {
      items: [item],
    },
    expectedState: {
      items: [
        {
          ...item,
          qty: 3,
        },
      ],
    },
  },
  {
    description: "removeProductFromCart() removes product from cart",
    actionCreator: removeProductFromCart,
    args: product,
    state: { items: [item] },
    expectedState: { items: [] },
  },
  {
    description: "removeProductFromCart() does nothing if product not in cart",
    actionCreator: removeProductFromCart,
    args: { ...product, sku: 2 },
    state: { items: [item] },
    expectedState: { items: [item] },
  },
  {
    description: "clearCart() removes products from cart",
    actionCreator: clearCart,
    args: undefined,
    state: { items: [item] },
    expectedState: { items: [] },
  },
  {
    description: "incrementQuantity() increments product qty",
    actionCreator: incrementQuantity,
    args: product,
    state: { items: [item] },
    expectedState: {
      items: [
        {
          ...item,
          qty: 3,
        },
      ],
    },
  },
  {
    description: "incrementQuantity() does nothing if product not in cart",
    actionCreator: incrementQuantity,
    args: { ...product, sku: 2 },
    state: { items: [item] },
    expectedState: { items: [item] },
  },
  {
    description: "decrementQuantity() decrements product qty",
    actionCreator: decrementQuantity,
    args: product,
    state: { items: [item] },
    expectedState: {
      items: [
        {
          ...item,
          qty: 1,
        },
      ],
    },
  },
  {
    description: "decrementQuantity() removes product if qty is 0",
    actionCreator: decrementQuantity,
    args: product,
    state: {
      items: [
        {
          ...item,
          qty: 1,
        },
      ],
    },
    expectedState: { items: [] },
  },
  {
    description: "decrementQuantity() does nothing if product not in cart",
    actionCreator: decrementQuantity,
    args: { ...product, sku: 2 },
    state: { items: [item] },
    expectedState: { items: [item] },
  },
  {
    description: "does nothing on unknown action",
    actionCreator: () => ({
      type: "UNKNOWN_ACTION",
    }),
    args: undefined,
    state: { items: [item] },
    expectedState: { items: [item] },
  },
]

describe("cart reducer", () => {
  for (const {
    description,
    actionCreator,
    args,
    state,
    expectedState,
  } of testCases) {
    it(description, () => {
      const result = reducer(state, actionCreator(args))
      expect(result).toMatchObject(expectedState)
    })
  }
})

describe("getCartSummary()", () => {
  it("gets correct summary from items", () => {
    const items = [{ price: 1, qty: 1 }]
    const result = getCartSummary(items)
    expect(result).toMatchObject({
      subtotal: 1,
      totalTax: 0.1,
    })
    expect(result.totalCost).toBeCloseTo(46.12)
    expect(result.shippingCost).toBeCloseTo(45.02)
  })
  it("shipping cost 0 when calculation is negative", () => {
    const items = [{ price: 0, qty: 100 }] // will make shippingCost negative
    const result = getCartSummary(items)
    expect(result.shippingCost).toEqual(0)
  })
})
