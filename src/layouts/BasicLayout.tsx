/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
// import React from 'react'
import type { BasicLayoutProps as ProLayoutProps } from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import { HomeOutlined } from '@ant-design/icons'
// import { history, Link, useLocation } from '@vitjs/runtimes'
import { useNavigate, Link, useLocation } from '@tanstack/react-location'
import RightContent from '@/container/GlobalHeader/RightContent'
import GlobalFooter from '@/container/GlobalFooter'
import { cookieGet } from '@/utils/storage'

import defaultSettings from '../../config/defaultSettings'

const adminLoginPath = '/admin/login'
const loginPath = '/login'
let role = cookieGet('role')

export type BasicLayoutProps = {
  route: ProLayoutProps['route'];
} & ProLayoutProps;

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <ProLayout
      // logo={Logo}
      {...props}
      onPageChange={async () => {
        // If you are not logged in, redirect to login
        // if (localStorage.getItem('status') !== 'ok' && history.location.pathname !== loginPath) {
        // if (typeof status !== 'string' && history.location.pathname !== loginPath) {

        // if (await cookieGet('status') !== 'ok' && history.location.pathname !== loginPath) {
        let token = cookieGet('token')
        if (typeof token === 'string') {
          if (!token) {
            if (role === 'admin') {
              navigate({ to: adminLoginPath })
            } else {
              navigate({ to: loginPath })
            }
          }
        }

      }}
      onMenuHeaderClick={() => navigate({ to: '/' })}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>
      }}
      rightContentRender={() => <RightContent />}
      breadcrumbRender={(routers = []) => [
        {
          // path: '/',
          path: role === 'admin' ? '/admin/dashboard' : role === 'dosen' ? '/dosen/dashboard' : role === 'mahasiswa' ? '/mahasiswa/dashboard' : '/',
          breadcrumbName: (<HomeOutlined />) as any
        },
        ...routers
      ]}
      itemRender={(route, params, routes, paths) => {
        return (
          <Link to={route.path}>
            <span>{route.breadcrumbName}</span>
          </Link>
        )
        // const first = routes.indexOf(route) === 0
        // return first ? (
        //   <Link to={paths.join('/admin/dashboard')}>{route.breadcrumbName}</Link>
        // ) : (
        //   <Link to={route.path}>
        //     <span>{route.breadcrumbName}</span>
        //   </Link>
        // )
      }}
      footerRender={() => <GlobalFooter />}
      // waterMarkProps={{
      //   content: 'Rotary Club Medan Deli',
      //   fontColor: 'rgba(24,144,255,0.15)',
      // }}
      menuHeaderRender={(logo, title) => (
        <>
          {logo}
          <div>
            {title}
          </div>
        </>
      )}
      {...defaultSettings}
    />
  )
}

export default BasicLayout
