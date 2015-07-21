angular.module('starter.controllers')
.controller('MyProfileDetailsCtrl', ['$localstorage','$scope','$rootScope','$http','$location','MyProfileService','$ionicScrollDelegate','$ionicLoading','$ionicPopup','FullImgService','CommonServiceDate', function MyProfileDetailsCtrl($localstorage,$scope,$rootScope,$http,$location,MyProfileService,$ionicScrollDelegate,$ionicLoading,$ionicPopup,FullImgService,CommonServiceDate) {
        $scope.loading = true;
//        $localstorage.set('zoomImagePage',false);
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
         $localstorage.set('FromPage','app/MyProfile');
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
           angular.element(document.querySelector("#tabUpload")).removeClass("active");
           angular.element(document.querySelector("#tabCamera")).removeClass("active");
         };
         setTabClass();
        var mpc = this;
        mpc.MyId = $localstorage.get('sessionMyID');
        console.log("MyId in userProfile controller: "+mpc.MyId);
        //$rootScope.sessionMyID='55041cadc20ec607edaf772a';
        //alert('login user:'+ $localstorage.get('sessionMyID'));
        
//       $scope.loadingWheel();
       // $rootScope.state='app/MyProfile';
       // mpc.details=[];
        mpc.Posts=[];
        $scope.postLikesAvailable = false;
//        mpc.OwnInfo{};
    $scope.filterEvenStartFrom = function (index) {
        return function (item) {
            return index++ % 2 === 1;
        };
    };
    mpc.getCommentClickedImageId = function(imageid)
    {
        console.log("Comment clicked image id: " +imageid);
//          $rootScope.sessionCommentClickedImageID = imageid;
        $localstorage.set('commentClickedChk','true');
//            alert($localstorage.get('commentClicked'));
        $location.path("app/FullSizeImage/"+imageid);
    };
        mpc.user =   {
              userID:$localstorage.get('sessionMyID')
            };
//            alert(mpc.user.userID);
        mpc.getOwnInfo = function(){
            $scope.loadingWheel();
            console.log('inside getowninfo',mpc.user);
            MyProfileService.getOwnInfo(mpc.user).then(function (response) {
                    console.log(response.data);
                    mpc.OwnInfo = response.data;
                    $localstorage.set('currentPath',mpc.OwnInfo.DPPath);
//                    alert("DP: "+mpc.OwnInfo.DPPath);
//                    alert("name: "+mpc.OwnInfo.userName);
//                    $rootScope.currentPath = mpc.OwnInfo.DPPath;
                    $scope.loadinggetOwninfo = true;
                    console.log('mydetails:',mpc.OwnInfo);
                },
                function (error) {
                    console.log("Error in getOwnInfo Service", error);
                 });

	};
        mpc.getOwnInfo();
        $scope.moredata = false;
        $scope.moredesigns = false;
        $scope.totalPosts = 0;
    $scope.loadMoreData=function()
    {
        $scope.moredesigns = false;
        console.log("loadmoredata:    @@@@@@: ",mpc.Posts );
        mpc.Posts.push(mpc.dumy[$scope.counter]);
        $scope.counter += 1;   
        console.log("mpc.Posts.length @@@@@@ :",mpc.Posts.length,$scope.totalPosts);
        if(mpc.Posts.length === $scope.totalPosts)
        {
            $scope.moredata=true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
        
        mpc.getOwnPost = function(){
            $scope.like = false;
            $scope.loadingWheel();
            console.log("inside getPost");
            console.log("mpc.user",mpc.user);
            MyProfileService.getOwnPost(mpc.user).then(function (response) {
                //console.log(response.data);
			//mpc.Posts = response.data;
                        if(response.data[0].message)
                        {
                            $scope.noDataPopup("Posts",response.data[0].message);
                            $scope.postLikesAvailable = false;
                        }
                        else
                        {                            
                            //mpc.Posts = response.data;
                            //mpc.Posts = [];
                            
                            mpc.dumy = response.data;
                            $scope.counter = 0;
                            $scope.totalPosts = mpc.dumy.length;
                            for (var i = 0; i < response.data.length; i++) {
                                var dateStr = new Date(response.data[i].uploadDate);
                                var dateToShow = CommonServiceDate.getPostDate(dateStr);
                                response.data[i].uploadDate = dateToShow;
                            }
                            if($scope.totalPosts>20)
                            {
                                for( ; $scope.counter<20; $scope.counter++)
                                {
                                    mpc.Posts.push(mpc.dumy[$scope.counter]);
                                }   
                            }
                            else
                            {
                                mpc.Posts = response.data;
                                $scope.moredata = true;
                            }
                            $scope.postLikesAvailable = true;
                        }
                        $ionicScrollDelegate.scrollTop();
                        $scope.loading = false;
                        $ionicLoading.hide();
                        console.log('mpc.Posts posts',mpc.Posts,mpc.Posts.length);
            },
            function (error) {
               console.log("Error in getOwnPost Service", error);
            });

	};
        mpc.getOwnPost();

	mpc.getOwnLike = function(){
            $scope.like = true;
            $scope.loadingWheel();
            MyProfileService.getOwnLike(mpc.user).then(function (response) {
                //console.log(response.data);
                if(response.data[0].message)
                {
                    $scope.noDataPopup("Likes",response.data[0].message);
                    $scope.postLikesAvailable = false;
                }
                else
                {
                   mpc.Posts = [];
                   mpc.dumy = response.data;
                   $scope.counter = 0;
                   $scope.totalPosts = mpc.dumy.length;
                    for (var i = 0; i < response.data.length; i++) {
                        var dateStr = new Date(response.data[i].uploadDate);
                        var dateToShow = CommonServiceDate.getPostDate(dateStr);
                        response.data[i].uploadDate = dateToShow;
                    }
                    if($scope.totalPosts>20)
                    {
                        for( ; $scope.counter<20; $scope.counter++)
                        {
                            mpc.Posts.push(mpc.dumy[$scope.counter]);
                        } 
                    }
                    else
                    {
                        mpc.Posts = response.data;
                        $scope.moredata = true;
                    }
                    $scope.postLikesAvailable = true;
                }
                $ionicScrollDelegate.scrollTop();
                $scope.loading = false;
                $ionicLoading.hide();
                console.log('mpc.Posts likes',mpc.Posts,mpc.Posts.length);
            },
            function (error) {
               console.log("Error in getOwnLikes Service", error);
            });

	};
        mpc.sendimgID = function (imgid){
         console.log('myprofile page');
        console.log('img id to be passed:',imgid);
        $localstorage.set('commentClickedChk','false');
//        $rootScope.sessionImageID= imgid;
        $localstorage.set('sessionImageID',imgid);
        $location.path("app/FullSizeImage/"+imgid);
        };    
        mpc.sendEditimgID = function (imgid){
        console.log('img id to be passed:',imgid);
//        $rootScope.sessionImageID= imgid;
        $localstorage.set('sessionImageID',imgid);
        }; 
        $scope.ClickedLikedMyProfile = function (post){          
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
                        if($scope.like === true)
                        {
                            $scope.loadingWheel();
                            mpc.getOwnLike();
                        }
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
}]);
