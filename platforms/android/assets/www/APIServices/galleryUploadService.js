angular.module('Services')
.service('galleryUploadService', function ($http) {

	this.uploadImage = function (PostData) {
		console.log(" uploadImage PostData", PostData);
                
            return $http.post( baseURL + '/api/photo', PostData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (response) {
                return response;
            });
	};
    });


