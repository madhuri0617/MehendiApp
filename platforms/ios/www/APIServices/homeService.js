/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('Services',[])
.service('homeService', function ($http) {

//	$rootScope.$on('headerData', function (event, data) {
//		$rootScope.headerData = data;
//	});
	this.popular = function (PostData) {
		console.log(" popular PostData", PostData);
		return $http({
			method: 'POST',
			data: PostData,
			url: baseURL + '/popular'
			
		});
	};
        
        	this.recent = function (PostData) {
		console.log(" recent PostData", PostData);
		return $http({
			method: 'POST',
			data: PostData,
			url: baseURL + '/recent'
			
		});
	};
    });

