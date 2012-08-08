


var parse_key_attrs = exports.parse_key_attrs = function(key, routes) {
  var route;
  var attrs = {};

  for (var i=0; i < routes.length; i++) {
    route = routes[i];
    if (route.regexp.test(key)) {
      var keys = route.keys;
      var params = route.regexp.exec(key).slice(1, keys.length + 1);
      keys.forEach(function(row, i) {
        attrs[row.name] = params[i];
      });
    }
  }
  return attrs;
}
