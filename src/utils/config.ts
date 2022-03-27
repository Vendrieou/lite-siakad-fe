const params = {
  APIPROTOCOL: process.env.APIPROTOCOL || 'http',
  APIHOST: process.env.APIHOST || 'localhost',
  PROD_APIHOST: process.env.PROD_APIHOST || 'localhost',
  PROD_APIPROTOCOL: process.env.PROD_APIPROTOCOL || 'http',
  APIPORT: process.env.APIPORT || 8010,
  APIVERSION: process.env.APIVERSION || '',
  
  PROD_APIHOSTIMAGE: process.env.PROD_APIHOSTIMAGE || 'localhost',
  APIHOSTIMAGE: process.env.APIHOSTIMAGE || 'localhost',
  APIPORTIMAGE: process.env.APIPORTIMAGE || 4000,
  APIVERSIONIMAGE: process.env.APIVERSIONIMAGE || '',
  APIURLONLY: '',
  APIURL: '',
  APIUPLOAD: ''
}
  
params.APIURLONLY = `${params.APIPROTOCOL}://${params.APIHOST}:${params.APIPORT}`
params.APIURL = process.env.NODE_ENV === 'production' ?
  `${params.PROD_APIPROTOCOL}://${params.PROD_APIHOST}`:
  `${params.APIPROTOCOL}://${params.APIHOST}:${params.APIPORT}${params.APIVERSION}`

params.APIUPLOAD = process.env.NODE_ENV === 'production' ?
  `${params.PROD_APIPROTOCOL}://${params.PROD_APIHOSTIMAGE}`:
  `${params.APIPROTOCOL}://${params.APIHOSTIMAGE}:${params.APIPORTIMAGE}${params.APIVERSIONIMAGE}`
  
export default {
  ...params
}
  
export const production = process.env.NODE_ENV === 'production'
  
export const apiRole = '/role'
export const apiAuth = '/auth'
export const apiUser = '/user'
export const apiSearch = '/search'
export const apiAsset = '/asset'
export const apiHome = '/dashboard'
export const apiMember = '/member'
export const apiArticle = '/article'
export const apiProduct = '/product'
export const apiImage = '/image/upload'
export const apiPresentation = '/presentation/upload'
export const apiDocument = '/doc/upload'
export const apiPdf = '/pdf/upload'
export const apiUtils = '/utils'
export const apiCategory = '/category'
export const apiDonasi = '/donasi'
export const apiDonatur = '/donatur'
export const apiPeminta = '/peminta'
export const apiTestimonial = '/testimonial'
export const apiCourse = '/course'
export const apiKrs = '/krs'
export const apiKhs = '/khs'
export const apiNews = '/news'
export const apiProvince = '/province'
export const apiCity = '/city'
export const apiPushNotification = '/push-notification'
