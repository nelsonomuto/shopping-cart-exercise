const React = require("react")
const gatsby = jest.requireActual("gatsby")

const mockProducts = {
  allDataJson: {
    edges: [
      {
        node: {
          products: [
            {
              sku: "fake-sku",
              title: "fake-title",
              price: 999.99,
              image: "fake-image-url",
            },
          ],
        },
      },
    ],
  },
}

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn().mockImplementation(() => mockProducts),
}
