export const dollars = amt => {
  const roundedValue = Math.round(amt * 100) / 100
  return "$" + roundedValue.toFixed(2)
}
