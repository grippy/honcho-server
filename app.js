var express = require('express');
var params = require('express-params');

var honcho = require('./lib/honcho');
var handlers = require('./handlers');
var app = express.createServer();

// Path to our public directory
var public_path = __dirname + '/public';
var views_path = __dirname + '/views';

app.configure(function() {

  app.set('views', views_path);
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});

  app.use(express.logger());
  app.use(express.bodyParser());

  app.use(honcho.middleware({
    mount: '/honcho'
  }));
});

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// enable params extention
params.extend(app);

// // route params...
app.param('name', String);
app.param('key', String);

// homepage
app.get('/', function(req, res){res.send('hail the raindance')});

app.get('/admin', handlers.admin_home);
app.get('/admin/tests', handlers.admin_tests.default);
app.get('/admin/tests/show/:key(*)', handlers.admin_tests.show.get);
app.get('/admin/tests/create', handlers.admin_tests.create.get);

app.post('/admin/tests/create', handlers.admin_tests.create.post);

app.get('/admin/tests/update/:key(*)', handlers.admin_tests.update.get);
app.put('/admin/tests/update/:key(*)', handlers.admin_tests.update.put);

app.delete('/admin/tests/delete/:key(*)', handlers.admin_tests.delete);
app.post('/admin/tests/reset/:key(*)', handlers.admin_tests.reset);

app.listen(3000);