var openJsonFile = function(callback) {
  require('fs').readFile('./resources/jobs.json', 'utf8', function (err, data) {
      if (err) throw err; // we'll not consider error handling for now
      var jsonObj = JSON.parse(data);
      callback(jsonObj);
  });
}
 
module.exports = {
  loadJobs: function(callback) {
    require('fs').readFile('./resources/jobs.json', 'utf8', function (err, data) {
        if (err) throw err; // we'll not consider error handling for now
        var jobsObj = JSON.parse(data);
        callback(jobsObj);
    });
  },
  loadJob: function(job_index, callback) {
    require('fs').readFile('./resources/jobs.json', 'utf8', function (err, data) {
      if (err) throw err; // we'll not consider error handling for now
      var jobsObj = JSON.parse(data);
      if (job_index < 0 || job_index >= data.length) {
        console.log('accessing job with invalid index: ' + job_index);
        return;
      }
      console.log(jobsObj[job_index]);
      callback(jobsObj[job_index]);
    });
  }
}
