var async = require('async');
var honcho = require('../lib/honcho');

/*****************************************************/


var get_test = function(key, callback) {
  honcho.redis.hgetall(key, function(err, props) {
    callback(err, props);
  });
}

/*****************************************************/

var tests = module.exports = {};

tests.default = function(res, req, next) {

}

tests.show = {};

/**
  Stats view by test key
  route: /admin/test/show/:key
**/
tests.show.get = function(req, res, next) {


  var key = req.params[0];
  if (!key) return next(new Error('Missing key'));
  async.auto({
    stats: function(callback) {
      var match = honcho.keys.match('/' + key);
      var stat_key = honcho.keys.map['stats_test'];

      //
      stat_key.handler({key: key}, callback);

    }
  }, function(err, results) {


      res.send(results.stats)




  });
};

tests.create = {};
tests.create.get = function(req, res, next) {
  // show the default form for a test




};

tests.create.post = function(req, res, next) {
  // post the new test here
  var test = req.body.test;

};


tests.update = {};
tests.update.get = function(req, res, next) {
  // return the test here
  var key = req.params[0];

  async.auto({
    test: function(callback) {
      get_test('/' + key, callback);
    }
  }, function(err, results) {

    res.locals.test = results.test;

    res.render('pages/test_form.jade', {layout: false});


      // res.send(results)
  });

};

tests.update.put = function(req, res, next) {

};


tests.delete = function(req, res, next) {

};

tests.reset = function(req, res, next) {

};

