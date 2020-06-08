module.exports = {
  extends: 'sweet/node',
  rules: {
    'no-console': 'off',
    'unicorn/no-null': 'off'
  },
  overrides: [{
    files: 'test/test.js',
    extends: [
      'sweet/node',
      'plugin:ava/recommended'
    ]
  }]
};
