import { Redirect } from '@vitjs/runtime'
import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import { cookieGet, getUserToken } from '@/utils/storage'
let currentRole = cookieGet('role')
let token = getUserToken()

const withAuth = (Component: any) => (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
  if (token) {
      return <Component {...props} />
    // return <div>{props.children}</div>;
  } else {
    if (currentRole === 'admin') {
        return <Redirect to="/admin/login" />;
    } else {
        return <Redirect to="/login" />;
    }
  }
}

export default withAuth
