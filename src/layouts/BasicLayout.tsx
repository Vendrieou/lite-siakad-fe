/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type { BasicLayoutProps as ProLayoutProps } from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import { HomeOutlined } from '@ant-design/icons'
import { history, Link, useLocation } from '@vitjs/runtime'

import RightContent from '@/container/GlobalHeader/RightContent'
import GlobalFooter from '@/container/GlobalFooter'
import { cookieGet } from '@/utils/storage'

import defaultSettings from '../../config/defaultSettings'

const loginPath = '/admin/login'

export type BasicLayoutProps = {
  route: ProLayoutProps['route'];
} & ProLayoutProps;

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const location = useLocation()

  return (
    <ProLayout
      // logo={Logo}
      {...props}
      // onPageChange={async () => {
      //   // If you are not logged in, redirect to login
      //   // if (localStorage.getItem('status') !== 'ok' && history.location.pathname !== loginPath) {
      //   // if (typeof status !== 'string' && history.location.pathname !== loginPath) {


      //   if (await cookieGet('status') !== 'ok' && history.location.pathname !== loginPath) {
      //     history.push(loginPath)
      //   } 

      // }}
      onMenuHeaderClick={() => history.push('/')}
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
          path: '/admin/dashboard',
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
