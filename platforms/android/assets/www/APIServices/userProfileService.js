angular.module('Services')
        .service('userProfileService',function($http){
        this.getUserInfo = function (PostData) {
            console.log("getOwnInfo sendData", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/userProfile'
            });
	};
        this.getUserPost = function (PostData) {
            console.log("", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/userProfile/post'
            });
	};
        this.getUserLike = function (PostData) {
            console.log(" PostData", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/userProfile/like'
            });
	};
            
});


