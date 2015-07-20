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
        this.uploadDpCamera = function (PostData) {
		console.log(" uploadDpCamera PostData"+ PostData);
                
//            return $http.post( baseURL + '/api/photoCamera', PostData, {   
            return $http.post(baseURL + '/profilePicCamera/updateCamera', PostData).then(function (response) {
//            return $http.post('http://192.168.2.135:3000/apiCamera/photoCamera', PostData).then(function (response) {
                return response;
            });
        }
    });





