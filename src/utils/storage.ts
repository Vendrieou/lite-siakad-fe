import cookie from 'js-cookie'

const cookieSet = (key: string, value: any) => {
  return cookie.set(key,value)
}

const cookieGet = (key: string) => {
  return cookie.get(key)
}

const cookieRemove = (key: string) => {
  return cookie.remove(key)
}

const getUserToken = () => {
  const token = cookie.get('token')
  return token
}

const getUserRole = () => {
  return cookie.get('role') || 'guest' 
}

const get = async (key: string) => {
  let data = [] as any
  try {
    data = await localStorage.getItem(key)
    return data
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const set = async (key: string, data: string) => {
  try {
    await localStorage.setItem(key, data)
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const remove = async (key: string) => {
  try {
    const removeProgress = await localStorage.removeItem(key)
    return removeProgress
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const setRegional = (id: number, name: string) => {
  const data = {
    storeId: id,
    cityName: name
  }
  return set('@regional', JSON.stringify(data))
}

const getCityId = async () => {
  const data = await get('@regional')
  const value = JSON.parse(data)
  return value.storeId
}

const getCityName = async () => {
  const data = await get('@regional')
  const value = JSON.parse(data)
  return value.cityName
}

export {
  getUserToken,
  getUserRole,
  cookieSet,
  cookieGet,
  cookieRemove,
  get,
  set,
  remove,
  setRegional,
  getCityId,
  getCityName
}
