// import request from 'umi-request';
import request from '@/utils/request'

// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// export async function queryProvince() {
//   return request('/api/geographic/province');
// }
// export async function queryCity(province) {
//   return request(`/api/geographic/city/${province}`);
// }
// export async function query() {
//   return request('/api/users');
// }


export async function queryCurrent() {
  return request({
    url: '/api/currentUser'
  });
}
export async function queryProvince() {
  return request({
    url: '/api/geographic/province'
  });
}
export async function queryCity(province) {
  return request({
    url: `/api/geographic/city/${province}`
  });
}
export async function query() {
  return request({
    url: '/api/users'
  });
}