module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    //plugins: ['expo-router/babel'],
    /* plugins: [
      // Replace the deprecated plugin with the recommended one
      '@babel/plugin-transform-logical-assignment-operators'
    ] */
  };
};
