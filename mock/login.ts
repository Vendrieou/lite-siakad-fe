import type { MockMethod } from '@vitjs/vit';

export default [
  {
    url: '/api/login/account',
    method: 'post',
    timeout: 240,
    response: ({ body }) => {
      const { password, email, type } = body;
      if (password === 'vite-react' && email === 'admin') {
        return {
          data: {
            status: 'ok',
            type,
            authority: 'admin',
            token: 'eye45',
          }
        };
      }
      if (password === 'vite-react' && email === 'user') {
        return {
          data: {
            status: 'ok',
            type,
            authority: 'user',
          }
        };
      }
      if (type === 'mobile') {
        return {
          data: {
            status: 'ok',
            type,
            authority: 'admin',
          }
        };
      }
      return {
        data: {
          status: 'error',
          type,
          authority: 'guest',
        }
      };
    },
  },
  {
    url: '/api/login/captcha',
    method: 'get',
    timeout: 240,
    response: () => {
      return {
        code: 0,
        data: 'captcha-xxx',
      };
    },
  },
] as MockMethod[];
