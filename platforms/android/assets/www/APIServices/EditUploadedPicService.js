angular.module('Services')
        .service('EditUploadedPicService',function($http){
        this.getPostDetail = function (PostData) {
            console.log(" deatils PostData", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/editPic'
            });
	};
        this.updatePostDetail = function (PostData) {
            console.log("", PostData);
            return $http({
                method: 'POST',
                data: PostData,
                url: baseURL + '/editPic/update'
            });
	};
        
});


