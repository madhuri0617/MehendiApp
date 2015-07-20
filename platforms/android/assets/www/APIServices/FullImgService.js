
angular.module('Services')
        .service('FullImgService',function($http){
        this.getImage = function (PostData) {
            console.log(" deatils PostData", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/clickImage'
            });
	};
        this.likeClicked = function (PostData) {
            console.log("", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/clickImage/likeClicked'
            });
	};
        this.unlikeClicked = function (PostData) {
            console.log(" deatils PostData", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/clickImage/unlikeClicked'
            });
	};
            
        });