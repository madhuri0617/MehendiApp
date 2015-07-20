

angular.module('Services')
.service('commentsService', function ($http) {

//	$rootScope.$on('headerData', function (event, data) {
//		$rootScope.headerData = data;
//	});
	this.comments = function (PostData) {
		console.log(" comments PostData", PostData);
		return $http({
			method: 'POST',
			data: PostData,
			url: baseURL + '/comments'
			
		});
	};
        
        	this.PostcommentService = function (PostData) {
		console.log(" Postcomment PostData", PostData);
		return $http({
			method: 'POST',
			data: PostData,
			url: baseURL + '/comments/post'
			
		});
	};
    });
