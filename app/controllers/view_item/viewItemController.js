/*
* @author Mathioudakis Theodore
* Agro-Know Technologies - 2013
*
*/

//Define viewItemController controller in 'app'
//---
listing.controller("viewItemController", function($rootScope, $scope, $http, $location, $routeParams) {

	//GENERAL
	var language_mapping=[], audience_mapping=[];
	language_mapping['en'] = "English";

	/*AKIF URL*/
	$scope.akif = 'http://api.greenlearningnetwork.com/search-api/v1/akif/';
	/* $scope.item_resource_id = ''; */
	$scope.item_resource_url = '';

	//Elements default values
	$scope.item_title = "No title available";
	$scope.item_description = "No description available";

	//FUNCTIONS

	// function `getItem()`:
	//- this functions runs on init, reads url parameters and make the specific call to our API
	$rootScope.getItem = function() {

		//we split the parameter from URL (i.e /item/35701_AGLRGFSP) and get the item id and the set
		var item_identifier = $routeParams.itemId.split('_')[0]; //SET_ID
		var item_set = $routeParams.itemId.split('_')[1];

		var headers = {'Content-Type':'application/json','Accept':'application/json;charset=utf-8'};

		$http({
			method : 'GET',
			url : $scope.akif + item_set + '/' + item_identifier, //..akif/ILUMINA/18169
			type: 'json',
			headers : headers
		})
		.success(function(data) {
			//parse array and create a JS Object Array
			//every item is a JSON
			$scope.curr_url = $location.absUrl();
			var thisJson = data.results[0];

			//used to get the first available language in case we don't have en.
			var first_lang = Object.keys(thisJson.languageBlocks)[0];
			console.log(first_lang);

			//WE USE 'EN' IF EXISTS
			if (thisJson.languageBlocks[$scope.selectedLanguage] !== undefined) {

				//we take the languageBlock for 'en' from the specific json and add it in a variable.
				languageBlock = thisJson.languageBlocks[$scope.selectedLanguage];

				//title
				if(languageBlock.title !== undefined) $scope.item_title = languageBlock.title;

				//description
				if(languageBlock.description !== undefined) $scope.item_description = languageBlock.description //.split("||");

				//keywords
				if(languageBlock.keywords !== undefined) $scope.item_keywords = languageBlock.keywords;

				//coverage
				if(languageBlock.coverage !== undefined) $scope.item_coverage = languageBlock.coverage;

			}
			// OR we get the first language we find available
			else if(thisJson.languageBlocks[first_lang] !== undefined) {

				//we take the languageBlock for 'en' from the specific json and add it in a variable.
				languageBlock = thisJson.languageBlocks[first_lang];

				//title
				if(languageBlock.title !== undefined) $scope.item_title = languageBlock.title;

				//description
				if(languageBlock.description !== undefined) $scope.item_description = languageBlock.description //.split("||");

				//keywords
				if(languageBlock.keywords !== undefined) $scope.item_keywords = languageBlock.keywords;

				//coverage
				if(languageBlock.coverage !== undefined) $scope.item_coverage = languageBlock.coverage;
			}


			//language
			thisJson.expressions[0].language !== undefined ? $scope.item_language = language_mapping[thisJson.expressions[0].language] : $scope.item_language = '-';

			//age range
			thisJson.tokenBlock.ageRange !== undefined ? $scope.item_age_range = thisJson.tokenBlock.ageRange : $scope.item_age_range = '-';

			//key audience
			$scope.item_roles = [];
			if(thisJson.tokenBlock.endUserRoles !== undefined) {
				for(i in thisJson.tokenBlock.endUserRoles) {
					$scope.item_roles.push(thisJson.tokenBlock.endUserRoles[i]);
				}
			}

			//contexts
			$scope.item_context = [];
			if(thisJson.tokenBlock.contexts !== undefined) {
				for(i in thisJson.tokenBlock.contexts) {
					$scope.item_context.push(thisJson.tokenBlock.contexts[i]);
				}
			}

			//learning resource types
			$scope.item_resource_types = [];
			if(thisJson.tokenBlock.learningResourceTypes !== undefined) {
				for(i in thisJson.tokenBlock.learningResourceTypes) {
					$scope.item_resource_types.push(thisJson.tokenBlock.learningResourceTypes[i]);
				}
			}
			console.log($scope.item_resource_types);

			//url
			if(thisJson.expressions[0].manifestations[0].items[0].url != undefined) {
				$scope.item_resource_url = thisJson.expressions[0].manifestations[0].items[0].url;
				socialGetter.getTwitterCount($scope.curr_url, 'twitterCallback');
			}

			//rights
			if(thisJson.rights.url !== undefined) $scope.item_rights = thisJson.rights.url;

			//icon
			if ( thisJson.tokenBlock.learningResourceTypes.indexOf('pathway') > -1 ) { $scope.item_icon = 'pathway.jpg' }
			else if( thisJson.tokenBlock.learningResourceTypes.indexOf('image') > -1 ) { $scope.item_icon = 'image.png'}
			else if( thisJson.tokenBlock.learningResourceTypes.indexOf('presentation') > -1 ) { $scope.item_icon = 'presentation.png'}
			else if( thisJson.tokenBlock.learningResourceTypes.indexOf('video') > -1 ) { $scope.item_icon = 'video.png'}
			else if( thisJson.tokenBlock.learningResourceTypes.indexOf('learning asset') > -1 ) { $scope.item_icon = 'learning_asset.png'}
			else if( thisJson.tokenBlock.learningResourceTypes.indexOf('lesson plan') > -1 ) { $scope.item_icon = 'lesson_plan.png'}
			else if( thisJson.tokenBlock.learningResourceTypes.indexOf('exploration') > -1 ) { $scope.item_icon = 'exploration.png'}
			else if( thisJson.tokenBlock.learningResourceTypes.indexOf('educational game') > -1 ) { $scope.item_icon = 'educational_game.png'}


			//organization
			thisJson.contributors[0].organization !== undefined ? $scope.item_organization = thisJson.contributors[0].organization : $scope.item_organization = '-';
				/*
					if (thisJson.tokenBlock.taxonPaths['Organic.Edunet Ontology'] !== undefined) {
						console.log(thisJson.tokenBlock.taxonPaths);
						$scope.item_classification =[];

						for(i in thisJson.tokenBlock.taxonPaths['Organic.Edunet Ontology']) {
							urls = thisJson.tokenBlock.taxonPaths['Organic.Edunet Ontology'][i].split('::');
							for(j in urls) {
								$scope.item_classification.push(urls[j].split("#")[1]);
							}
						}
					} else {
						$scope.item_classification = '-';
					}
				*/


		})

	};

});


