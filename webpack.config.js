module.exports = {
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        https: require.resolve('https-browserify'),
      }
    }
  };