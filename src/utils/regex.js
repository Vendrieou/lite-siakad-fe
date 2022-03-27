const isNumber = (number) => {
  const regex = /^([0-9.]{0,19})$/i
  return !regex.test(number)
}

export {
  isNumber
}
