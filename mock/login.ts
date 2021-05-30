import type { MockMethod } from '@vitjs/vit';

export default [
  {
    url: '/api/login/account',
    method: 'post',
    timeout: 240,
    response: ({ body }) => {
      const { password, username, type } = body;
      if (password === 'vite-react' && username === 'admin') {
        return {
          status: 'ok',
          type,
          authority: 'admin',
        };
      }
      if (password === 'vite-react' && username === 'user') {
        return {
          status: 'ok',
          type,
          authority: 'user',
        };
      }
      if (type === 'mobile') {
        return {
          status: 'ok',
          type,
          authority: 'admin',
        };
      }
      return {
        status: 'error',
        type,
        authority: 'guest',
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
