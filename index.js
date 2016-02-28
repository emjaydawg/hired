// var static = require('node-static');

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

function makeQueryString(params) {
  console.log(params);
  var result = "?";
  var keys = Object.keys(params);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (i > 0)
      result += "&";
    result += key + "=" + params[key];
  }

  return result;
}

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/jobs/', function(request, response) {
  jobLoader.loadJobs(function(jobsJSON) {
    console.log("loading jobs...");
    response.render('jobs', {title: "Jobs", jobs: jobsJSON, qparams:makeQueryString(request.query)});
  });
  console.log(makeQueryString(request.query));
});

app.get('/job/:jobid', function(request, response) {
  jobLoader.loadJob(request.params.jobid, function(jobJSON) {
    console.log('loading job[' + request.params.jobid + ']...');
    response.render('job', {job: jobJSON, qparams:makeQueryString(request.query)});
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

