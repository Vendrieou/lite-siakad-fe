module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    "semi": [
      2,
      "never"
    ],
    "camelcase": 0,
    "no-console": 0,
    "no-tabs": 0,
    "no-alert": 0,
    "comma-dangle": [
      "error",
      "never"
    ],
    "max-len": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-props-no-spreading": 0,
    "react/state-in-constructor": 0,
    "space-before-function-paren": [
      2,
      "always"
    ],
    "no-unused-expressions": [
      0,
      {
        "allowShortCircuit": true,
        "allowTernary": true
      }
    ],
    "arrow-body-style": [
      0,
      "never"
    ],
    "func-names": 0,
    "prefer-const": 0,
    "no-extend-native": 0,
    "no-param-reassign": 0,
    "no-restricted-syntax": 0,
    "prefer-rest-params": 0,
    "no-eval": 0,
    // "react-with-styles/no-unused-styles": 2,
    "react/jsx-no-bind": 0,
    "no-unused-vars": [
      2,
      {
        "ignoreRestSiblings": true
      }
    ],
    "no-underscore-dangle": 0,
    "global-require": 0,
    "jsx-a11y/href-no-hash": "off",
    // "jsx-a11y/anchor-is-valid": [
    //   "warn",
    //   {
    //     "aspects": [
    //       "invalidHref"
    //     ]
    //   }
    // ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    ],
    "react/require-default-props": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/prefer-stateless-function": 0,
    "react/react-in-jsx-scope": 0,
    "react/no-array-index-key": 0,
    "guard-for-in": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "no-cond-assign": 0,
    "consistent-return": 0,
    "no-nested-ternary": 0,
    "no-prototype-builtins": 0,
    "no-shadow": 0,
    "react/jsx-indent": [
      "warn",
      2
    ],
    "react/prop-types": 0,
    "indent": [
      "warn",
      2,
      {
        "SwitchCase": 1,
        "ObjectExpression": 1,
        "flatTernaryExpressions": true
      }
    ]
  },
  
};
