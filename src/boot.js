if (!global.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/sk.js',
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('.');
  });
} else {
  require('.');
}