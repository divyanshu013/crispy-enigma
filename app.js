angular.module('rail-res', ['ngMaterial'])
	.controller('AppCtrl', ['$scope', function($scope){
		$scope.currentNavItem = 'page1';
	}]);