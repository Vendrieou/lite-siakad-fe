import React from 'react'
import type { MenuDataItem } from '@ant-design/pro-layout'
import { getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from '@vitjs/runtime'

import GlobalFooter from '@/container/GlobalFooter'
import styles from './UserLayout.module.less'

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  match?: any;
  location: any;
  history: any;
  route: any;
};

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: []
    },
    children,
    location = {
      pathname: ''
    }
  } = props
  const { routes = [] } = route
  const { breadcrumb } = getMenuData(routes)
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    title: 'Lite Siakad',
    ...props
  })

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to='/'>
                {/* <img
                  alt='logo'
                  className={styles.logo}
                  src={Logo}
                /> */}
                <span className={styles.title}>STMIK TIME</span>
              </Link>
            </div>
          </div>
          {children}
        </div>
        <GlobalFooter />
      </div>
    </HelmetProvider>
  )
}

export default UserLayout
