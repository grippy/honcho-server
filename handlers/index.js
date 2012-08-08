var handlers = [
  'admin_home',
  'admin_tests'
];

handlers.forEach(function (handler) {
  module.exports[handler] = require('./' + handler);
});