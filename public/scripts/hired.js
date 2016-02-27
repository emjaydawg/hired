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