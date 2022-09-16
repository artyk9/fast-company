module.exports = {
   env: {
      browser: true,
      es2021: true
   },
   extends: ['plugin:react/recommended', 'standard'],
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      },
      ecmaVersion: 12,
      sourceType: 'module'
   },
   plugins: ['react'],
   rules: {
      indent: [
         0,
         4,
         {
            ignoredNodes: [
               'ConditionalExpression BlockStatement',
               'ConditionalExpression ArrayExpression'
            ]
         }
      ],
      'multiline-ternary': ['off'],
      semi: [2, 'always'],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': [
         'error',
         { anonymous: 'always', named: 'never' }
      ]
   }
};
