module.exports = {
  extends: 'sweet/node',
  overrides: [{
    files: 'test/test.js',
    extends: [
      'sweet/node',
      'plugin:ava/recommended'
    ]
  }]
};
