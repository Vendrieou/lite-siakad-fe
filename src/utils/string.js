export const currencyFormatter = (currency) => {
  if (typeof currency === 'string' || typeof currency === 'number') {
    if (typeof currency === 'number' && currency === 0) {
      return 'Free'
    }
    if (typeof currency === 'string' && currency === '0') {
      return 'Free'
    }
    return `Rp ${currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }
  return 'Rp 0'
}

export const numberFormatter = (currency) => {
  if (typeof currency === 'string' || typeof currency === 'number') {
    return `${currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }
  return '0'
}

export const discountFormatter = (number) => {
  if (typeof number === 'string' || typeof number === 'number') {
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}%`
  }
  return ''
}

export const composeData = (value, label) => {
  return ({ value, label })
}

export const passwordValidate = (value) => {
  if (typeof number === 'string' || typeof number === 'number') {
    return `${value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)}`
  }
  return ''
}

export const Capitalize = (value) => {
  if (typeof value === 'string') {
    return `${value.replace(/^\w/, (c) => c.toUpperCase())}`
  }
  return ''
}

export const trimDescription = (text = '') => {
  return text.substring(0, 200)
}

export const CountLinearProgressValue = (join, qty) => {
  if ((typeof join === 'number' && join > 0) && (typeof qty === 'number' && qty > 0)) {
    const MAX_VALUE = 100
    let Division = qty / join
    let total = MAX_VALUE / Division
    return Number(total)
  }
  return 0
}

export const statusData = (value) => {
  switch (Number(value)) {
    case 1:
      return 'pending'
    case 2:
      return 'paid'
    default:
      return null
  }
}

export const parserVideoId = (url) => {
  if (url) {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    let match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : ''
  }
  return null
}

export const truncStr = (string, limit) => {
  return string.length > limit
    ? `${string
      .trim()
      .substring(0, limit - 3)
      .trim()}...`
    : string
}

export const truncShapeName = (string, limit) => {
  return string.substr(0, limit - 1)
}

export const stringFormatter = (value) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return `${value.toString()}`
  }
  return '0'
}

export const isJsonString = (text) => {
  // let text = JSON.stringify({ allowedKelas: ['TIC', 'TIB', 'TIC'] })
  if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    return true
  }
  return false
}
