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
];

var canned_resources_data = [
	{

	}
]

var userProfileInformation = {
	name: 'Name of user'
}

var resourcesService = function() {
	return {
		getResources: function() {
			return canned_resources_data;
		}
	}
}

var userService = function() {
	return {
		getUser: function() {
			return userProfileInformation;
		},
		setUser: function(user) {
			userProfileInformation = user;
		}
	}
}

var jobsService = function() {
	return {
		getJobs: function() {
			return canned_jobs_data;
		}
	}
}