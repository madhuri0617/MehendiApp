angular.module('Services')
.service('galleryUploadService', function ($http) {

//	$rootScope.$on('headerData', function (event, data) {
//		$rootScope.headerData = data;
////	});
	this.uploadImage = function (PostData) {
		console.log(" uploadImage PostData", PostData);
                
            return $http.post( baseURL + '/api/photo', PostData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (response) {
                return response;
            });
//                            return $http.post(baseURL + '/api/photo', PostData, {
//                transformRequest: angular.identity,
//                headers: { 'Content-Type': undefined }
//            });
//                
//		return $http({
//                transformRequest: angular.identity,
//                headers: { 'Content-Type': undefined },
//			method: 'POST',
//			data: PostData,
//			url: baseURL + '/comments/post'		
//		});
//	};
        
//        this.uploadImage = function (PostData) {
//		console.log(" uploadImage PostData", PostData);
//		return $http({
//                ransformRequest: angular.identity,
//                headers: { 'Content-Type': undefined },
//			method: 'POST',
//			data: PostData,
//			url: baseURL + '/api/photo'
//			
//		});
	};
    });


