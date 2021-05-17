import { useEffect } from 'react'
import { useConcent } from 'concent'
import { Redirect, useLocation } from '@vitjs/runtime'
import { stringify } from 'querystring'

import PageLoading from '@/components/PageLoading'

const SecurityLayout: React.FC = ({ children }) => {
  const { state: me, connectedState, dispatch } = useConcent({
    module: 'me',
    connect: { loading: ['me/fetchMe'] }
  })
  const fetchMeLoading = connectedState.loading['me/fetchMe']
  const location = useLocation()

  // You can replace it to your authentication rule (such as check token exists)
  const isLogin = me && !!me.email
  const queryString = stringify({
    redirect: window.location.href
  })

  useEffect(() => {
    dispatch('fetchMe')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLogin || fetchMeLoading) {
    return <PageLoading />
  }

  if (!isLogin && location.pathname !== '/admin/login') {
    return <Redirect to={`/admin/login?${queryString}`} />
  }

  return <>{children}</>
}

export default SecurityLayout
