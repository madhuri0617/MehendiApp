angular.module('Services')
        .service('MyProfileService',function($http){
        this.getOwnInfo = function (PostData) {
            console.log("getOwnInfo sendData", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/userHome'
            });
	};
        this.getOwnPost = function (PostData) {
            console.log("", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/userHome/post'
            });
	};
        this.getOwnLike = function (PostData) {
            console.log(" PostData", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/userHome/like'
            });
	};
            
});


