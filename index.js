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
var jobLoader = require('./jobs.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(jadeStatic(__dirname + '/public'));
app.use('/resources', express.static(__dirname + '/resources'));
app.use('/styles', express.static(__dirname + '/styles'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/jobs/', function(request, response) {
  jobLoader.loadJobs(function(jobsJSON) {
    console.log("loading jobs...");
    response.render('jobs', {title: "Jobs", jobs: jobsJSON});
  });
});

app.get('/job/:jobid', function(request, response) {
  jobLoader.loadJob(request.params.jobid, function(jobJSON) {
    console.log('loading job[' + request.params.jobid + ']...');
    response.render('job', {job: jobJSON});
    /*
    response.render('job', {
      title: jobJSON.title,
      description:jobJSON.description,
      location:jobJSON.location,
      pay:jobJSON.pay,
      employment:jobJSON.employment});
    */
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

