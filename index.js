// var static = require('node-static');

var express = require('express');
var app = express();
var jadeStatic = require('jade-static');
var jobLoader = require('./jobs.js');
var menuLoader = require('./menu.js');
var bodyParser     =        require("body-parser");
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it




app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(jadeStatic(__dirname + '/public'));
app.use('/resources', express.static(__dirname + '/resources'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession({secret:'somesecrettokenhere'}));
app.use(cookieParser());

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
    return jobs.split(',');
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

function filterAppliedJobs(jobs, applied) {
  if (applied.length == 0)
    return [];
  var result = [];
  var filtAppIndices = applied[0].split(',');
  console.log('filter applied jobs');
  if (filtAppIndices.length <= applied.length)
    filtAppIndices = applied;
  for (var i = 0; i < filtAppIndices.length; i++) {
    var index = filtAppIndices[i];
    console.log('index: ' + index);
    result.push(jobs[parseInt(index)]);
  }
  return result;
}

var models = require('./server/models/index');

app.get('/users/register', function(request, response) {
  response.render('register');
});

app.post('/users/login', function(req, response) {
  var sess = req.session;
  return models.User.findOne({where: {
   username: req.body.username,
   password: req.body.password
  }}).then(function(user) {
    if(user) {
      sess.user = user;
      response.redirect('/');  
    }
    else {
      response.render('login', {
         error: 'incorrect username or password'
      });
    }
    
  })

  response.render('jobs');
})

app.post('/users/logout', function(req, response) {
  var sess = req.session;
  sess.user = undefined;
  req.session.destroy(function(err) {
    // cannot access session here
  })
  response.redirect('/');
})

app.get('/users/login', function(request, response) {
  response.render('login');
});

app.post('/users/create', function(req, response) {
    var sess = req.session;
  return models.User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  }).then(function(createdUser, _) {
    sess.user = createdUser;
    response.redirect('/');
  });
});

app.get('/', function(request, response) {
  var sess = request.session;

  response.render('pages/index', {user: sess.user});
});

app.get('/jobs/status', function(request, response) {
    var sess = request.session;
  jobLoader.loadJobs(function(jobsJSON) {
    console.log("loading applied jobs...");
    var appFavs = sanitizeQuery(request.query);
    var defParams = makeQueryString(appFavs);
    menuLoader.fetchMenus(defParams, function(menus) {
      console.log(menus);
      response.render('app_status', {
        title: "Jobs",
        jobs: filterAppliedJobs(jobsJSON, appFavs.applied),
        qparams:defParams,
        menuitems: menus,
        user: sess.user
      });
    });
  });
});

app.get('/jobs/', function(request, response) {
  var sess = request.session;
  jobLoader.loadJobs(function(jobsJSON) {
    console.log("loading jobs...");
    var appFavs = sanitizeQuery(request.query);
    var defParams = makeQueryString(appFavs);
    menuLoader.fetchMenus(defParams, function(menus) {
      console.log(menus);
      response.render('jobs', {
        title: "Jobs",
        jobs: mergeFavoriteAppliedFields(jobsJSON, appFavs.applied, appFavs.favorited),
        qparams:defParams,
        menuitems: menus,
        user: sess.user
      });
    });
  });
});

app.get('/job/:jobid', function(request, response) {
  var sess = request.session;
  jobLoader.loadJob(request.params.jobid, function(jobJSON) {
    console.log('loading job[' + request.params.jobid + ']...');
    var appFavs = sanitizeQuery(request.query);
    var isFav = isFavorite(appFavs.favorited, request.params.jobid);
    var hasApp = hasApplied(appFavs.applied, request.params.jobid);
    console.log('has applied(' + request.params.jobid + '): ' + hasApp);
    var defParams = makeQueryString(appFavs);
    menuLoader.fetchMenus(defParams, function(menus) {
      response.render('job', {
        job: jobJSON,
        jobid: request.params.jobid,
        qparams:defParams,
        favorite: isFav,
        applied: hasApp,
        aparams:makeQueryString(addApplied(appFavs, request.params.jobid)),
        menuitems: menus,
        user: sess.user
      });
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

