    angular.module('starter.controllers')
    .controller('CommentCtrl', ['$http','$scope','$rootScope','commentsService','$localStorage','$ionicLoading','$ionicScrollDelegate','$localstorage','$ionicPopup', function CommentCtrl($http,$scope,$rootScope,commentsService,$localStorage,$ionicLoading,$ionicScrollDelegate,$localstorage,$ionicPopup) {
        $scope.loading = true;
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
            $scope.errorPopup = function() {
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Write Comment..',
                    okType: ' button-upload'
                });
            };
        if($rootScope.commentCount>0)
        {
            $scope.loadingWheel();
        }
        var cmt = this;
        
        cmt.posts = 
        {
            postID : $rootScope.sessionCommentClickedImageID
        };
        console.log("post you commented on: " + cmt.posts.postID)
//        $scope.var={};
        cmt.PostsResult=[];
        console.log("called");
        commentsService.comments(cmt.posts).then(function (response) {
            cmt.PostsResult = response.data;
            $scope.loading = false;
            $ionicLoading.hide();
            console.log("comments", cmt.PostsResult);
        },
        function (error) {
            console.log("Error comments", error);
         });
        
        	cmt.getComments = function(){
                    $scope.loadingWheel();
                    console.log("inside comments page : " +$rootScope.sessionCommentClickedImageID)
                    cmt.posts = 
                            {
                                postID : $rootScope.sessionCommentClickedImageID
                            };
		console.log("I recieve POST ID : " + $rootScope.sessionCommentClickedImageID);

        commentsService.comments(cmt.posts).then(function (response) {
            cmt.PostsResult = response.data;
            $ionicScrollDelegate.scrollTop();
            $scope.loading = false;
            $ionicLoading.hide();
            console.log("comments", cmt.PostsResult);
        },
        function (error) {
            console.log("Error comments", error);
         });

	};       
        cmt.postComment = function(){
                    $scope.loadingWheel();
                    cmt.posts.postID = $rootScope.sessionCommentClickedImageID;
                    cmt.posts.userID = $localstorage.get('sessionMyID');
                    cmt.posts.comment = cmt.comment;
                    
		console.log("POST ID : " + cmt.posts.postID);
		console.log("USER ID : " + cmt.posts.userID);
		console.log("Comments : " + cmt.posts.comment);
        if(!cmt.posts.comment)
        {
            $scope.errorPopup();
            $scope.loading = false;
            $ionicLoading.hide();
        }
        else
        {
            commentsService.PostcommentService(cmt.posts).then(function (response) {
                    cmt.PostsResult = response.data;
                    $scope.loading = false;
//            $ionicLoading.hide();
                    console.log("comments", cmt.PostsResult);
                    cmt.getComments();
                    cmt.comment = "";
                },
                function (error) {
                    console.log("Error comments", error);
                });
        }
	};

}]);