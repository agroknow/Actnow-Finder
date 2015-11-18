/*
* Mathioudakis Theodore
* Agro-Know Technologies - 2013
*/


/*Define ng-app module*/
var listing = angular.module('akListing',['ngRoute', 'ui.bootstrap', 'djds4rce.angular-socialshare']);
/* var listing = angular.module('akListing',['ngRoute','mainController','listingController']); */

angular.module('akListing').run(function($FB){
  $FB.init('1112141975477816');
});
/* $locationProvider Configuration */
/*
listing.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.html5Mode(true)
	}]);
*/
listing.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

/* Shared Properties Service */
listing.service('sharedProperties',
	function () {
	    var total = 0;
	    var activeFacets = [];
	    var inactiveFacets = [];

	    return {
	        getTotal: function () {
	            return total;
	        },

	        setTotal: function(value) {
	            total = value;
	        },
	    };
	});

//Routing
//----
//manages the routing and defines which template should be rendered in any time based on the url
listing.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			// search
			when('/educational/search/', {
				templateUrl: 'templates/search.html',
				controller: 'listingController'
			}).
			when('/educational/search/:search_param', {
				templateUrl: 'templates/search.html',
				controller: 'listingController'
			}).
			// view-item
			when('/item', {
				templateUrl: 'templates/item.html',
				controller: 'viewItemController'
			}).
			when('/item/:itemId', {
				templateUrl: 'templates/item.html',
				controller: 'viewItemController'
			}).

			// general
			when('/', {
				templateUrl: 'templates/main.html',
				controller: 'mainController'
			}).
			when('/resources', { 
				templateUrl: 'resources.html'
			}).

			otherwise({
				redirectTo: '/'
			});
	}]);
