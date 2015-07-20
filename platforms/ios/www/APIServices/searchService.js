/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('Services')
.service('searchService', function ($http) {

//	$rootScope.$on('headerData', function (event, data) {
//		$rootScope.headerData = data;
//	});
	this.search = function (PostData) {
		console.log(" search PostData", PostData);
		return $http({
			method: 'POST',
			data: PostData,
			url: baseURL + '/search'
			
		});
	};
        
    });


