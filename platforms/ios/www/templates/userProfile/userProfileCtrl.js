    angular.module('starter.controllers')
    .controller('uploaderCtrl', ['$http','$scope','$rootScope','userProfileService','$ionicScrollDelegate','$ionicLoading','$ionicPopup', function uploaderCtrl($http,$scope,$rootScope,userProfileService,$ionicScrollDelegate,$ionicLoading,$ionicPopup) {
        $scope.loading = true;
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        $scope.loadingWheel();
        $scope.noDataPopup = function(msg1,msg2) {
            $ionicPopup.alert({
              title: msg1,
              template: msg2,
              okType: ' button-upload' 
          });
          };
        function setTabClass() {
           angular.element(document.querySelector("#tabMyprofile")).addClass("active");
           angular.element(document.querySelector("#tabHome")).removeClass("active");
         };
        setTabClass();
        var uc = this;
        uc.Posts=[];
        $scope.postLikesAvailable = false;
        $rootScope.state='app/uploaderProfile';

       console.log("User ID: " +$rootScope.sessionUserID);
       console.log("My ID: " +$rootScope.sessionMyID);
        uc.user={};
        uc.user.userID=$rootScope.sessionUserID;
        uc.user.sessionID=$rootScope.sessionMyID;
        //console.log('uis from home page',uc.user.uid);
        
        uc.getUserInfo = function(){
            userProfileService.getUserInfo(uc.user).then(function (response) {
                    console.log('response of getUserInfo',response.data);
                    uc.Profile = response.data;
                    $scope.loadinggetOwninfo = true;
                    console.log('uc.Profile',uc.Profile);
                },
                function (error) {
                    console.log("Error in getUserInfo Service", error);
                 });
//		$http.post('http://api-ratemymehendi.rhcloud.com/userProfile',uc.user).success(function(response){
//			//console.log(response);
//			uc.Profile = response;
//		});
	};
                $scope.moredata = false;
        $scope.totalPosts = 0;
        $scope.loadMoreData=function()
        {
            console.log("loadmoredata:    @@@@@@: ",uc.Posts );
            uc.Posts.push(uc.dumy[$scope.counter]);
            $scope.counter += 1;   
            console.log("uc.Posts.length @@@@@@ :",uc.Posts.length,$scope.totalPosts);
            if(uc.Posts.length === $scope.totalPosts)
            {
                $scope.moredata=true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
      
        uc.getUserPost = function(){
            $scope.loadingWheel();
            userProfileService.getUserPost(uc.user).then(function (response) {
                    //uc.Posts = response.data;
                    //uc.Posts = [];
                    uc.dumy = response.data;
                    $scope.counter = 0;
                    $scope.totalPosts = uc.dumy.length;
                    if($scope.totalPosts>20)
                    {
                        for( ; $scope.counter<20; $scope.counter++)
                        {
                            uc.Posts.push(uc.dumy[$scope.counter]);
                        }   
                    }
                    else
                    {
                        uc.Posts = response.data;
                        $scope.moredata = true;
                    }
                    $scope.postLikesAvailable = true;
                    $ionicScrollDelegate.scrollTop();
                    $scope.loading = false;
                    $ionicLoading.hide();
                    console.log('uc.Posts posts',uc.Posts,uc.Posts.length);
                },
                function (error) {
                    console.log("Error in getUserPost Service", error);
                 });
                 
//		$http.post('http://api-ratemymehendi.rhcloud.com/userProfile/post',uc.user).success(function(response){
//			console.log(response);
//			uc.Posts = response;
//		});
	};

        uc.getUserLike = function(){
            //$scope.loadingWheel();
		userProfileService.getUserLike(uc.user).then(function (response) {
                        //console.log("response likes", response.data);
                if(response.data[0].message)
                {
                    $scope.noDataPopup("Likes","No likes found");
                    $scope.postLikesAvailable = false;
                }
                else
                {
                   $scope.loadingWheel();
                   uc.Posts = [];
                   uc.dumy = response.data;
                   $scope.counter = 0;
                   $scope.totalPosts = uc.dumy.length;
                    if($scope.totalPosts>20)
                    {
                        for( ; $scope.counter<20; $scope.counter++)
                        {
                            uc.Posts.push(uc.dumy[$scope.counter]);
                        } 
                    }
                    else
                    {
                        uc.Posts = response.data;
                        $scope.moredata = true;
                    }
                    $scope.postLikesAvailable = true;
                }
                    $ionicScrollDelegate.scrollTop();
                    $scope.loading = false;
                    $ionicLoading.hide();
                    console.log('uc.Posts likes',uc.Posts,uc.Posts.length);
                },
                function (error) {
                    console.log("Error in getUserLike Service", error);
                 });
                 
//		$http.post('http://api-ratemymehendi.rhcloud.com/userProfile/like',uc.user).success(function(response){
//			console.log('like response:',response);
//                        uc.Posts = response;
//			// uc.Likes = response;
//		});
	};
//         uc.uploaderLike = function () {
//            uc.details = [
//            {  
//            imagePath : 'img/thumbnail3.png'          
//        },
//            { 
//            imagePath : 'img/thumbnail4.png'          
//        }
//    ];
//        };
        
    uc.getpostid=function(pid){
            console.log('user profile page');
        console.log('postid to be passed:',pid);
        $rootScope.sessionImageID=pid;
    };
//    hm.msg = function () {
//        console.log(hm.message);
//    };
    
}]);


