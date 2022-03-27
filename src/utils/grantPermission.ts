import { cookieGet } from 'utils/storage'

export const grantPermission = (requestedRoles: string) => {
  const permittedRoles =  JSON.parse(cookieGet(requestedRoles))
  // in case of multiple roles, if one of the permittedRoles is present in requestedRoles, return true;
  if(permittedRoles === 'admin' || permittedRoles === 'mahasiswa' || permittedRoles === 'dosen')
  {
    return true
  }
  return false
}
  