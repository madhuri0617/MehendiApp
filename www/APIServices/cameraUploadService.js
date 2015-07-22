angular.module('Services')
.service('cameraUploadService', function ($http,$log) {

	this.uploadCameraImage = function (PostData) {
		$log.debug(" uploadCameraImage PostData", PostData);
                
//            return $http.post( baseURL + '/api/photoCamera', PostData, {   
            return $http.post(baseURL + '/apiCamera/photoCamera', PostData).then(function (response) {
//            return $http.post('http://192.168.2.135:3000/apiCamera/photoCamera', PostData).then(function (response) {
                return response;
            });
            
	};
    });