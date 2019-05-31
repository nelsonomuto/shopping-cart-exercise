import {
  addProductToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeProductFromCart,
} from "../../../src/store/cart/actions"
import reducer from "../../../src/store/cart/reducer"

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
      expect(result).toEqual(expectedState)
    })
  }
})
