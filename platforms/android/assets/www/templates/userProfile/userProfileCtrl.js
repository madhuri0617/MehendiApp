    angular.module('starter.controllers')
    .controller('uploaderCtrl', ['$http','$scope','$rootScope','userProfileService','$ionicScrollDelegate','$ionicLoading','$ionicPopup','$location','$localstorage','FullImgService','CommonServiceDate', function uploaderCtrl($http,$scope,$rootScope,userProfileService,$ionicScrollDelegate,$ionicLoading,$ionicPopup,$location,$localstorage,FullImgService,CommonServiceDate) {
        $scope.loading = true;
        $rootScope.zoomImagePage = false;

//        $localstorage.set('zoomImagePage',false);
//       $rootScope.zoomImagePage = $localstorage.get('zoomImagePage');
                 console.log("$rootScope.zoomImagePage"+$rootScope.zoomImagePage);
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
         $localstorage.set('FromPage','app/userProfile');
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
           angular.element(document.querySelector("#tabSearch")).removeClass("active");
         };
        setTabClass();
        $scope.filterEvenStartFrom = function (index) {
            return function (item) {
                return index++ % 2 === 1;
            };
        };
        var uc = this;
                uc.MyId = $localstorage.get('sessionMyID');
                    console.log("MyId in userProfile controller: "+uc.MyId);
        uc.Posts=[];
        $scope.postLikesAvailable = false;
//        $rootScope.state='app/uploaderProfile';

       console.log("User ID: " +$localstorage.get('sessionUserID'));
//       console.log("My ID: " +$rootScope.sessionMyID);
       console.log("My ID: " +$localstorage.get('sessionMyID'));
        uc.user={};
//        uc.user.userID=$rootScope.sessionUserID;
        uc.user.userID = $localstorage.get('sessionUserID');
//        uc.user.sessionID=$rootScope.sessionMyID;
        uc.user.sessionID=$localstorage.get('sessionMyID');
        //console.log('uis from home page',uc.user.uid);
        
        uc.getUserInfo = function(){
            userProfileService.getUserInfo(uc.user).then(function (response) {
                    console.log('response of getUserInfo',response.data);
                    uc.Profile = response.data;
                    $scope.profilePhoto = uc.Profile.DPPath;
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
        $scope.moredesigns = false;
        $scope.totalPosts = 0;
        $scope.loadMoreData=function()
        {
            $scope.moredesigns = false;
            console.log("loadmoredata: ",uc.Posts );
            uc.Posts.push(uc.dumy[$scope.counter]);
            $scope.counter += 1;   
            console.log("uc.Posts.length: ",uc.Posts.length,$scope.totalPosts);
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
                    for (var i = 0; i < response.data.length; i++) {
                            var dateStr = new Date(response.data[i].uploadDate);
                            var dateToShow = CommonServiceDate.getPostDate(dateStr);
                            response.data[i].uploadDate = dateToShow;
                    }
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
            $scope.loadingWheel();
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
                    for (var i = 0; i < response.data.length; i++) {
                            var dateStr = new Date(response.data[i].uploadDate);
                            var dateToShow = CommonServiceDate.getPostDate(dateStr);
                            response.data[i].uploadDate = dateToShow;
                    }
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
            $localstorage.set('commentClickedChk','false');
        console.log('postid to be passed:',pid);
//        $rootScope.sessionImageID=pid;
          $location.path("app/FullSizeImage/"+pid);
    };
    uc.getCommentClickedImageId = function(imageid)
    {
        console.log("Comment clicked image id: " +imageid);
//          $rootScope.sessionCommentClickedImageID = imageid;
        $localstorage.set('commentClickedChk','true');
//            alert($localstorage.get('commentClicked'));
        $location.path("app/FullSizeImage/"+imageid);
    };
    uc.zoomProfile = function()
    {
        console.log("zoomProfile");
//                    alert($scope.profilePhoto);
//        $rootScope.imageToZoom = $scope.profilePhoto;
        $localstorage.set('imageToZoom',$scope.profilePhoto);
        $location.path('app/zoomImage');
    };
    $scope.ClickedLikedUserProfile = function (post){
            // console.log("image like clicked ", post);
            var MyID=$localstorage.get('sessionMyID');

            console.log('inide checkLogin() myid:',MyID);
            console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);

           if(!MyID)
           {
               console.log(" inside login");
               $scope.loginPopup();
           }
           else
           {
               var imgDetails = {
                        postID  : post._id,                        
                        userID:$localstorage.get('sessionMyID')//'55041c5ec20ec607edaf7729' 
                };

                //-------------------------------------continue from here-----------------------------------------
                
                // FullImgService.likeClicked(imgDetails).
                if (post.liked) 
                {
                    //callunlike
                    //alert('called unlike');
                    $scope.loadingWheel();
                    FullImgService.unlikeClicked(imgDetails).then(function (response) {
                    post.liked=false;
                    // likeClr();
                    // $scope.likesCount = $scope.likesCount - 1;
                    post.cntLikes = post.cntLikes - 1;
                            //alert("$scope.likesCount" + $scope.likesCount);
                        $scope.loadingLike = false;
                        $ionicLoading.hide();
                    },
                    function (error) {
                        console.log("error in unlike", error);
                     });
                     
                }
                else
                {
                    $scope.loadingWheel();
                    FullImgService.likeClicked(imgDetails).then(function (response) {
                    post.liked=true;
                    // fsc.likeClr();
                       // $scope.likesCount = $scope.likesCount + 1;
                        //alert("$scope.likesCount" + $scope.likesCount);
                        post.cntLikes = post.cntLikes + 1;
                        $scope.loadingLike = false;
                        $ionicLoading.hide();
                    },
                    function (error) {
                        console.log("error in like", error);
                     });
                   
                }  
           }
        };
//    hm.msg = function () {
//        console.log(hm.message);
//    };
    
}]);


