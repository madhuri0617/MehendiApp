angular.module('starter.controllers')
.controller('MyProfileDetailsCtrl', ['$localstorage','$scope','$rootScope','$http','$location','MyProfileService','$ionicScrollDelegate','$ionicLoading','$ionicPopup', function MyProfileDetailsCtrl($localstorage,$scope,$rootScope,$http,$location,MyProfileService,$ionicScrollDelegate,$ionicLoading,$ionicPopup) {
        $scope.loading = true;
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
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
        var mpc = this;
        //$rootScope.sessionMyID='55041cadc20ec607edaf772a';
        //alert('login user:'+ $localstorage.get('sessionMyID'));
        
       $scope.loadingWheel();
       // $rootScope.state='app/MyProfile';
       // mpc.details=[];
        mpc.Posts=[];
        $scope.postLikesAvailable = false;
//        mpc.OwnInfo{};
        mpc.user =   {
              userID:$localstorage.get('sessionMyID')
            };
            
        mpc.getOwnInfo = function(){
            console.log('inside getowninfo',mpc.user);
            MyProfileService.getOwnInfo(mpc.user).then(function (response) {
                    console.log(response.data);
                    mpc.OwnInfo = response.data;
                    $rootScope.currentPath = mpc.OwnInfo.DPPath;
                    $scope.loadinggetOwninfo = true;
                    console.log('mydetails:',mpc.OwnInfo);
                },
                function (error) {
                    console.log("Error in getOwnInfo Service", error);
                 });

	};
        mpc.getOwnInfo();
        $scope.moredata = false;
        $scope.totalPosts = 0;
    $scope.loadMoreData=function()
    {
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
        $rootScope.sessionImageID= imgid;
        };                          
}]);
//            mpc.user = {
//			//pID:'55191836535c2d3356a01e95'//$rootScope.sessionImageID
//                        												// begining of response set used for scroll down
//			userID:'55041c5ec20ec607edaf7729'												// tagName used for filtering the response on toggle click
//		};

//		// console.log("inside getUpldrPost() function...");
//		 mpc.user = {
//		 	uid : "55041c5ec20ec607edaf7729",
//		 	strt : 0
//		 };

//		$http.post('http://api-ratemymehendi.rhcloud.com/userHome',mpc.user).success(function(response){
//			console.log(response);
//			mpc.OwnInfo = response;
//                        console.log('mydetails:',mpc.OwnInfo);
//		});

//		$http.post('http://api-ratemymehendi.rhcloud.com/userHome/like',mpc.user).success(function(response){
//			console.log(response);
//			mpc.Posts = response;
//		});	

//		$http.post('http://api-ratemymehendi.rhcloud.com/userHome/post',mpc.user).success(function(response){
//			console.log(response);
//			mpc.Posts = response;
//		});
