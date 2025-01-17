const browserslist = require('browserslist');

const coreJsVersion = process.env.RING_UI_COREJS_VERSION ||
  require('core-js/package.json').version;

const isDeprecatedCoreJS = coreJsVersion.startsWith('2');

module.exports = function config(api) {
  api.cache(true);

  if (isDeprecatedCoreJS) {
    // eslint-disable-next-line no-console
    console.log(`Compiling Ring UI with deprecated Core JS version "${coreJsVersion}". Consider updating to 3rd.`);
  }

  return {
    presets: [
      ['@jetbrains/babel-preset-jetbrains', {
        angular: true,
        useBuiltIns: 'usage',
        corejs: isDeprecatedCoreJS ? '2' : '3'
      }]
    ],
    plugins: [
      ['babel-plugin-transform-define', {
        SUPPORTED_BROWSERS: browserslist()
      }]
    ],
    env: {
      test: {
        plugins: ['require-context-hook']
      }
    }
  };
};
