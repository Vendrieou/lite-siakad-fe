const isNumber = (number) => {
  const regex = /^([0-9.]{0,19})$/i
  return !regex.test(number)
}

export const randomId = (length = 10) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export {
  randomId,
  isNumber
}
