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

  console.log('converted');
  console.log(result);
  return result;
}

function sanitize(jobs) {
  if (jobs == '')
    return [];
  if (jobs == '')
    return [];
  if (typeof jobs === 'string')
    return [jobs];
  return jobs;
}

function sanitizeQuery(query) {
  var applied = query.applied;
  var favorited = query.favorited;

  if (applied == undefined) {
    applied = [];
  }
  if (favorited == undefined) {
    favorited = [];
  }
  return {applied: sanitize(applied), favorited: sanitize(favorited)};
}

function addJob(jobs, jobId) {
  var result = jobs;

  for (var i = 0; i < jobs.length; i++) {
    if (jobs[i] == ('' + jobId)) {
      // job is found.
      return result;
    }
  }

  // job not found.
  result.push(jobId);
  return result;
}

function addFavorited(params, jobId) {
  console.log('called addFavorited');
  return {applied:params.applied, favorited:addJob(params.favorited,jobId)};
}

function addApplied(params, jobId) {
  console.log('called addApplied: ' + params);
  return {applied:addJob(params.applied,jobId), favorited:params.favorited};
}

function isFavorite(favorites, jobid) {
  return favorites.indexOf(jobid) > -1;
}

function hasApplied(applications, jobid) {
  return applications.indexOf(jobid) > -1;
}

function addFavoriteAppliedFields(jobs) {
  var results = jobs;
  for (var i = 0; i < jobs.length; i++) {
    results[i].applied = false;
    results[i].favorited = false;
  }
  return results;
}

function mergeFavoriteAppliedFields(jobs, applied, favorites) {
  var results = addFavoriteAppliedFields(jobs);
  for (i in applied) {
    results[i].applied = true;
  }
  for (i in favorites) {
    results[i].favorited = true;
  }
  return results;
}

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/jobs/', function(request, response) {
  jobLoader.loadJobs(function(jobsJSON) {
    console.log("loading jobs...");
    console.log(request.query);
    var appFavs = sanitizeQuery(request.query);
    console.log('sanitized query');
    console.log(appFavs);
    response.render('jobs', {
      title: "Jobs",
      jobs: mergeFavoriteAppliedFields(jobsJSON, appFavs.applied, appFavs.favorited),
      qparams:makeQueryString(request.query)
    });
  });
});

app.get('/job/:jobid', function(request, response) {
  jobLoader.loadJob(request.params.jobid, function(jobJSON) {
    console.log('loading job[' + request.params.jobid + ']...');
    var appFavs = sanitizeQuery(request.query);
    var isFav = isFavorite(appFavs.favorited, request.params.jobid);
    var hasApp = hasApplied(appFavs.applied, request.params.jobid);
    response.render('job', {
      job: jobJSON,
      jobid: request.params.jobid,
      qparams:makeQueryString(appFavs),
      favorite: isFav,
      applied: hasApp,
      aparams:makeQueryString(addApplied(appFavs, request.params.jobid)) 
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

