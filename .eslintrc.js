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
         'error',
         3,
         {
            ignoredNodes: [
               'ConditionalExpression BlockStatement',
               'ConditionalExpression ArrayExpression'
            ]
         }
      ],
      semi: [2, 'always'],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'never']
   }
};
