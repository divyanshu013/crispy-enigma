(function () {
	angular.module('rail-res', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache',
		'ngRoute', 'md.data.table'])
	.controller('AppCtrl', AppCtrl)
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.html'
			})

			.when('/feed', {
				templateUrl: 'feed.html',
				controller: ('FeedCtrl', FeedCtrl)
			})

			.when('/about', {
				templateUrl: 'about.html'
			})
	}]);

	function AppCtrl($scope) {
		$scope.currentNavItem = 'Home';
	};

	function FeedCtrl($scope, $http, $mdToast, $mdDialog) {
		console.log("Loading JSON");
		$http.get("data.json")
			.then(function (response) {
				$scope.data = response.data;
				console.log($scope.data);
			});

		$scope.query = {
			order: 'number',
			origin: '',
			destination: ''
		}

		$scope.reserveList = [];

		$scope.remove = function(number) {
			var index = -1;		
			var dataArray = eval( $scope.data );
			for( var i = 0; i < dataArray.length; i++ ) {
				if( dataArray[i].number === number ) {
					index = i;
					break;
				}
			}
			var temp = {
				'number': dataArray[index].number,
				'origin': dataArray[index].origin,
				'destination': dataArray[index].destination,
				'price': dataArray[index].price
			};

			dataArray.splice( index, 1 );

			var toast = $mdToast.simple()
				.textContent('Removed from List')
				.action('UNDO')
				.highlightAction(true);
      		$mdToast.show(toast).then(function(response) {
	      		if ( response == 'ok' ) {
	      			$scope.data.push(temp);
	      		}
      		});
		}

		$scope.discard = function(number) {


		    var confirm = $mdDialog.confirm()
		    .title('Are you sure?')
		    .textContent('The reservation will be permanently discarded.')
		    .ariaLabel('Reservation')
		    .ok('Yes')
		    .cancel('No');
		    $mdDialog.show(confirm).then(function() {
		    	var index = -1;		
		    	var dataArray = eval( $scope.reserveList );
		    	for( var i = 0; i < dataArray.length; i++ ) {
		    		if( dataArray[i].number === number ) {
		    			index = i;
		    			break;
		    		}
		    	}

		    	var temp = {
					'number': dataArray[index].number,
					'origin': dataArray[index].origin,
					'destination': dataArray[index].destination,
					'price': dataArray[index].price
				};

		    	dataArray.splice( index, 1 );

		    	var toast = $mdToast.simple()
		    	.textContent('Marked as read')
		    	.action('UNDO')
		    	.highlightAction(true);
		    	$mdToast.show(toast).then(function(response) {
		    		if ( response == 'ok' ) {
		    			$scope.reserveList.push(temp);
		    		}
		    	});
		    });
		}

		$scope.reserve = function(number) {
			var index = -1;		
			var dataArray = eval( $scope.data );
			for( var i = 0; i < dataArray.length; i++ ) {
				if( dataArray[i].number === number ) {
					index = i;
					break;
				}
			}

			$scope.reserveList.push({
				'number': dataArray[index].number,
				'origin': dataArray[index].origin,
				'destination': dataArray[index].destination,
				'price': dataArray[index].price
			});

			dataArray.splice( index, 1 );

			var toast = $mdToast.simple()
				.textContent('Marked as read')
				.action('UNDO')
				.highlightAction(true);
      		$mdToast.show(toast).then(function(response) {
	      		if ( response == 'ok' ) {
	      			alert('You clicked the \'UNDO\' action.');
	      		}
      		});
		}
	}


})();
