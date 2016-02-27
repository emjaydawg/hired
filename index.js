// var static = require('node-static');


// //
// // Create a node-static server instance to serve the './public' folder
// //
// var file = new static.Server('./public');

// require('http').createServer(function (request, response) {
//     request.addListener('end', function () {
//         //
//         // Serve files!
//         //
//         file.serve(request, response);
//     }).resume();
// }).listen(process.env.PORT || 5000);


var express = require('express');
var app = express();
var jadeStatic = require('jade-static');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(jadeStatic(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

