var app = angular.module('chirpApp',['ngRoute','ngResource']).run(function($rootScope, $http){
	$rootScope.authenticated = false;
	$rootScope.current_user = "";

	$rootScope.logout = function(){
		$http.get('/auth/signout');

		$rootScope.authenticated = false;
		$rootScope.current_user = "";
	};
});

app.config(function($routeProvider){
	$routeProvider
		//The timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//The login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//The timeline display
		.when('/register', {
			templateUrl: 'registration.html',
			controller: 'authController'
		});
})
.factory('postService', function($resource){
	return $resource('/api/posts/:id');
})
.controller('mainController', function($scope, $rootScope, postService){
    $scope.posts = postService.query();
    $scope.newPost = {
        created_by: '',
        text: '',
        created_at: ''
    };

	//postService.getAll().success(function(data){
	//	$scope.posts = data;
	//});
    $scope.post = function(){
			$scope.newPost.created_by = $rootScope.current_user;
			$scope.newPost.created_at = Date.now();
			postService.save($scope.newPost, function(){
				$scope.posts = postService.query();
				$scope.newPost = {
					created_by: '',
					text: '',
					created_at: ''
				};
			});
    };
})

.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
});

