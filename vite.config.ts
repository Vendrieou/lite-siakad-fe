import * as path from 'path';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import tsconfigPaths from 'vite-tsconfig-paths';
import vitApp from '@vitjs/vit';
import routes from './config/routes';

const projectRootDir = path.resolve(__dirname);

require('dotenv').config();

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  
  return defineConfig({
    base: '/',
    define:{
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PORT_HTTP': JSON.stringify(process.env.PORT_HTTP),
      'process.env.PORT_HTTPS': JSON.stringify(process.env.PORT_HTTPS),
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      'process.env.APIPROTOCOL': JSON.stringify(process.env.APIPROTOCOL),
      'process.env.APIHOST': JSON.stringify(process.env.APIHOST),
      'process.env.APIPORT': JSON.stringify(process.env.APIPORT),
      'process.env.APIVERSION': JSON.stringify(process.env.APIVERSION),
      'process.env.APIIMAGE_PROTOCOL': JSON.stringify(process.env.APIIMAGE_PROTOCOL),
      'process.env.APIHOSTIMAGE': JSON.stringify(process.env.APIHOSTIMAGE),
      'process.env.APIPORTIMAGE': JSON.stringify(process.env.APIPORTIMAGE),
      'process.env.APIVERSIONIMAGE': JSON.stringify(process.env.APIVERSIONIMAGE),
      'process.env.PUBLIC_VAPID_KEY': JSON.stringify(process.env.PUBLIC_VAPID_KEY),
      // PRODUCTION ENV
      'process.env.PROD_APIHOST':JSON.stringify(process.env.PROD_APIHOST),
      'process.env.PROD_APIPROTOCOL':JSON.stringify(process.env.PROD_APIPROTOCOL),
      'process.env.PROD_APIHOSTIMAGE':JSON.stringify(process.env.PROD_APIHOSTIMAGE),
    },
    plugins: [
      react(),
      tsconfigPaths(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
      vitApp({
        routes,
        dynamicImport: {},
        //   loading: './components/PageLoading',
        // },
        exportStatic: {},
        // mock: { productionEnabled: true },
      }),
    ],
    server: {
      port: 8080,
      // watch: {
      //   usePolling: true,
      //   useFsEvents: true,
      // }
    },
    resolve: {
      alias: [
        { find: 'src', replacement: path.resolve(projectRootDir, 'src') },
        { find: 'pages', replacement: path.resolve(projectRootDir, 'src/pages') },
        { find: 'utils', replacement: path.resolve(projectRootDir, 'src/utils') },
        { find: 'layouts', replacement: path.resolve(projectRootDir, 'src/layouts') },
        { find: 'components', replacement: path.resolve(projectRootDir, 'src/components') },
        { find: 'static', replacement: path.resolve(projectRootDir, 'static') },
        // { find: '@', replacement: path.resolve(__dirname, 'src') },
        // fix less import by: @import ~
        // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
        { find: /^~/, replacement: '' },
        // { find: /^~antd/, replacement: path.resolve(projectRootDir, 'node_modules/antd/') },
      ],
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          modifyVars: {
            'root-entry-name': 'default',
            'primary-color': '#08466D',
            'primary-1': '#e6ecf0',
            'info-color': '#1890ff'
          },
          javascriptEnabled: true,
        },
      },
    },
    // build: {
    //   watch: {},
    //   rollupOptions: {
    //     output: {
    //       manualChunks: {
    //         'react-venders': ['react', 'react-dom', '@vitjs/runtime'],
    //       },
    //     },
    //   },
    // },
    // build: {
    //   watch: {},
    //   rollupOptions: {
    //     output: {
    //       manualChunks: {
    //         'lodash-es': ['lodash-es', 'lodash'],
    //       },
    //     },
    //   },
    // },
    // esbuild: {
    //   jsxInject: "import * as React from 'react'",
    // },
  })
}
