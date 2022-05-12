import { defineModule } from 'concent'
// import { history } from '@vitjs/runtime'
import { createBrowserHistory } from '@tanstack/react-location'

import { queryMe } from '@/services/me'
import { get } from '@/utils/storage'
import { isContainAdminRole } from '@/utils/variable'

export interface Me {
  address?: string;
  avatar?: string;
  email?: string;
  name?: string;
  position?: string;
}
const history = createBrowserHistory()

const Model = defineModule({
  state: {
    address: '',
    avatar: '',
    email: '',
    name: '',
    position: '',
    currentItem: {}
  } as Me,

  reducer: {
    fetchMe: async (payload) => {
      let role = get('role')
      const data = {
        ...payload,
        role: payload.role
      }
      try {
        const response = await queryMe(data)
        return { currentItem: response.data }
      } catch (error) {
        if (isContainAdminRole(role)) {
          history.push('/admin/login')
        }
        if (await role === 'mahasiswa') {
          history.push('/mahasiswa/login')
        }
        if (await role === 'dosen') {
          history.push('/dosen/login')
        }
      }
    }

  }
})

export default Model
