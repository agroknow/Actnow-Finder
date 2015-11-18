/*
* @author Katsivelis Panagis
* Agro-Know Technologies - 2015
*
* in paginationController we keep all methods related to pagination
* NOTE:
* We need the following parameters to be defined in mainController
* paginationTop : true/false
* paginationBottom : true/false
* $scope.pageSize : number of results per page
* $scope.total : number of total results
* $scope.pages : holds the pages for pagination
*
*/


listing.controller("paginationController", function($rootScope, $scope, sharedProperties){

	/*calculate and add pages in pages[] for viewing in front end
    	only if top or bottom pagination is visible */
	$scope.initPagination = function(){
		if($scope.enablePaginationTop || $scope.enablePaginationBottom){
			$scope.numOfPages = sharedProperties.getTotal()/$scope.pageSize;
	    		$scope.pages.length = 0;/*clear pagination*/

			var rep = $scope.limitPagination;

		    	for(var i = 1; i<rep; i++){
				$scope.pages.push(Math.floor(i));
		    	}
	    		console.log($scope.pages);

		}
	};


	//Updates pagination, after search
	$rootScope.updatePagination = function(currentPage){
	  	$scope.numOfPages = sharedProperties.getTotal()/$scope.pageSize;
	  	$scope.pages.length = 0;/*clear pagination*/
		for(var i = Math.max(1, currentPage - 5); i <= Math.min(currentPage + 5, Math.ceil($scope.numOfPages)); i++) {
			$scope.pages.push(Math.floor(i));
	    	}
	};


	/*change page function*/
	$scope.goToPage = function(pageNum){
		if (pageNum == -1) {
			$scope.numOfPages = sharedProperties.getTotal()/$scope.pageSize;
			$rootScope.currentPage = Math.ceil($scope.numOfPages);
			$scope.findElements(false, 'classic'); //calls the search but replaces existing elements in listing
		}
		else {
			if(pageNum >= 1){
				$rootScope.currentPage = pageNum;
				$scope.findElements(false, 'classic'); //calls the search but replaces existing elements in listing
			}
		}		
		
	};

	//LOAD MORE ITEMS
	$scope.loadMore = function(pageNum) {
		console.log(pageNum);
		$rootScope.currentPage = pageNum;
	    $scope.findElements(false, 'mobile'); //calls the search and appends elements in listing
	}

});

