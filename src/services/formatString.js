export const dollars = amt => {
  const roundedValue = Math.round(amt * 100) / 100
  const result = roundedValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  return "$ " + result
}
