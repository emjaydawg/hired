var app = angular.module('hired', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/',
	{
		controller: homeController,
		templateUrl: 'templates/home.html'
	}).when('/jobs',
	{
		controller: jobsController,
		templateUrl: 'templates/jobs.html'
	}).otherwise({
		redirectTo: '/',
		controller: homeController
	});	
}]);


var homeController = function($scope){
	$scope.welcome = "Welcome to the home page!"
}

var jobsController = function($scope) {
	$scope.welcome = "Welcome to the jobs page!"
}

var canned_jobs_data = [
	{
		title: 'A title',
		location: 'A location',
		duration: 'A duration',
		url:'URL',
		description:'A description'
	}
]

var jobsService = function() {
	return {
		getJobs: function() {
			return canned_jobs_data;
		}
	}
}