# Q & A

## Automatically open the browser at startup

vite@&#8203; Before 2.0.1, the browser cannot be opened automatically by configuring `server.open: true`. After 2.0.2, the browser can be started by configuring the `BROWSER` environment variable. For details, refer to [vitejs/vite#2159](https://github.com/vitejs/vite/issues/2159).

## How to use antd under Vite

According to [official document](https://ant.design/docs/react/getting-started-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD) Note that the [`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import) plug-in is required under webpack, and the corresponding [vite-plugin] is required under Vite -imp](https://github.com/onebay/vite-plugin-imp) plugin. It is worth noting that:

### Use lib/\*_/_.less files directly

```js
vitePluginImp({
  libList: [
    {
      libName:'antd',
      style: (name) => `antd/lib/${name}/style/index.less`,
      // style: (name) => [`antd/lib/style/index.less`, `antd/lib/${name}/style/index.less`],
    },
  ],
});
```

This configuration may need to introduce `antd/lib/style/index` separately when using the component, and the style dependency of the component is not introduced. For example, the loading attribute cannot be used normally in the List component because the Spin component style is not introduced. And it is known that when using Col, Row components, there are no `antd/lib/col/style/index.less` and `antd/lib/row/style/index.less`, so the usability of this method is too low.

### Use lib/\*/style/index.js

```js
vitePluginImp({
  libList: [
    {
      libName:'antd',
      style: (name) => `antd/lib/${name}/style`,
    },
  ],
});
```

The runtime error `Uncaught ReferenceError: require is not defined`, because `antd/lib/${name}/style/index.js` uses require to introduce dependencies, but it cannot be recognized by the browser.

### final plan

```js
vitePluginImp({
  libList: [
    {
      libName:'antd',
      style: (name) => `antd/es/${name}/style`,
    },
  ],
});
```

es/\*/style/index.js uses import to introduce dependencies, which can be executed by the browser, and the problem of style dependencies is solved internally.
