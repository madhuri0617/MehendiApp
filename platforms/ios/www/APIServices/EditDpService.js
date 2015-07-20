angular.module('Services')
.service('EditDpService', function ($http) {

	this.uploadDp = function (PostData) {
		console.log(" uploadImage PostData", PostData);
                
            return $http.post( baseURL + '/profilePic/update', PostData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (response) {
                return response;
            });
	};
    });





