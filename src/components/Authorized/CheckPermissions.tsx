import React from 'react'
import { CURRENT } from './renderAuthorize'
// eslint-disable-next-line import/no-cycle
import PromiseRender from './PromiseRender'

export type IAuthorityType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  // eslint-disable-next-line no-unused-vars
  | ((currentAuthority: string | string[]) => IAuthorityType);

/**
 * Common check permissions method
 *
 * @param {Permission judgment} authority
 * @param {Your permission | Your permission description} currentAuthority
 * @param {Passing components} target
 * @param {no pass components | no pass components} Exception
 */
const checkPermissions = <T, K>(
  authority: IAuthorityType,
  currentAuthority: string | string[],
  target: T,
  Exception: K
): T | K | React.ReactNode => {
  // No judgment permission. View all by default
  // Retirement authority, return target;
  if (!authority) {
    return target
  }
  // array processing
  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority.includes(item))) {
        return target
      }
    } else if (authority.includes(currentAuthority)) {
      return target
    }
    return Exception
  }
  // string processing
  if (typeof authority ==='string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority === item)) {
        return target
      }
    } else if (authority === currentAuthority) {
      return target
    }
    return Exception
  }
  // Promise processing
  if (authority instanceof Promise) {
    return <PromiseRender<T, K> ok={target} error={Exception} promise={authority} />
  }
  // Function processing
  if (typeof authority ==='function') {
    const bool = authority(currentAuthority)
    // The return value after the function is executed is Promise
    if (bool instanceof Promise) {
      return <PromiseRender<T, K> ok={target} error={Exception} promise={bool} />
    }
    if (bool) {
      return target
    }
    return Exception
  }
  throw new Error('unsupported parameters')
}

export {checkPermissions}

function check<T, K> (authority: IAuthorityType, target: T, Exception: K): T | K | React.ReactNode {
  return checkPermissions<T, K>(authority, CURRENT, target, Exception)
}

export default check
