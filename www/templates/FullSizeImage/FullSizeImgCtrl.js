    angular.module('starter.controllers')
    .directive('focusMe', function($timeout) {
  return {
            link: function(scope, element, attrs) {
              scope.$watch(attrs.focusMe, function(value) {
                if(value === true) { 
                  console.log('value=',value);
                  $timeout(function() {
                    element[0].focus();
                    scope[attrs.focusMe] = false;
                  });
                }
              });
            }
        };
    })
    .controller('FullSizeImgCtrl', ['OpenFB','$http','$scope','$rootScope','FullImgService','$ionicPopup','$location','$cordovaSocialSharing','$ionicLoading','$localstorage','$stateParams','CommonServiceDate','commentsService','$ionicScrollDelegate', function(OpenFB,$http,$scope,$rootScope,FullImgService,$ionicPopup,$location,$cordovaSocialSharing,$ionicLoading,$localstorage,$stateParams,CommonServiceDate,commentsService,$ionicScrollDelegate)
    {      
//                console.log("inside full size controller");
        $scope.loading = true;
        $scope.fullsizeimageId = $stateParams.imageid ;
        $rootScope.zoomImagePage = false;
        $scope.commentClick = $localstorage.get('commentClickedChk');
//        alert()
//        $scope.fromFB=$stateParams.fromfb;
//                console.log("$scope.fromFB" + $scope.fromFB);
//                console.log($localstorage.get('RedirectFromFb'));
//        if ((typeof $localstorage.get('RedirectFromFb'))=== 'undefined') {
//               $scope.fromFB=true;
//            }
//            else{
//                $scope.fromFB=$localstorage.get('RedirectFromFb');
//            }
//                console.log("$scope.fromFB",$scope.fromFB);
//        $localstorage.set('zoomImagePage','false');
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        $scope.loadingWheel();
        function setTabClass() {
           angular.element(document.querySelector("#tabHome")).removeClass("active");
           angular.element(document.querySelector("#tabSearch")).removeClass("active");
           angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
           angular.element(document.querySelector("#tabCamera")).removeClass("active");
           angular.element(document.querySelector("#tabUpload")).removeClass("active");
         };
        setTabClass();

          $scope.errorPopup = function(msg) {
            $ionicPopup.alert({
              title: 'Error',
              template: msg,
              okType: ' button-upload' 
          });
          };
        var fsc = this;
        fsc.MyId = $localstorage.get('sessionMyID');
        console.log("MyId in userProfile controller: "+fsc.MyId);
        $scope.showPara = true;
//      $rootScope.FromPage='app/FullSizeImage';
        $localstorage.set('FromPage','app/FullSizeImage');
        //console.log("Image ID: " +$rootScope.sessionImageID);
        fsc.like='';
        fsc.MyId;
//        console.log('transfered imgid:',$rootScope.sessionImageID);
//        console.log('transfered imgid:',$scope.fullsizeimageId);
//            console.log('myid:',$localstorage.get('sessionMyID'));
//            if ((typeof $rootScope.sessionMyID)=== 'undefined') {
//               fsc.MyId='';
//            }
//            else{
//                fsc.MyId=$rootScope.sessionMyID;
//            }
            if ((typeof $localstorage.get('sessionMyID'))=== 'undefined') {
               fsc.MyId='';
            }
            else{
                fsc.MyId=$localstorage.get('sessionMyID');
            }
            //console.log('fsc.MyId:',fsc.MyId);
         fsc.getImage = function(){
                    
                    fsc.image = {
//			postID	:$rootScope.sessionImageID,
                        postID	:$scope.fullsizeimageId,
			userID:fsc.MyId//$rootScope.sessionMyID//'55041c5ec20ec607edaf7729'											
		};
 
//		console.log("I recieve POST ID : " + fsc.image.postID);
//		console.log("I recieve USER ID : " + fsc.image.userID);
                
                FullImgService.getImage(fsc.image).then(function (response) {
                    fsc.ImgDetails = response.data;
                    var dateStr = new Date(response.data.uploadDate);
                    var dateToShow = CommonServiceDate.getPostDate(dateStr);
                    response.data.uploadDate = dateToShow;
                    $scope.loading = false;
                    $ionicLoading.hide();
                    $scope.likesCount = fsc.ImgDetails.cntLikes;
                    $scope.commentsCount = fsc.ImgDetails.cntComments;
//                    $rootScope.commentCount = fsc.ImgDetails.cntComments;
//                    $localstorage.set('commentCount',fsc.ImgDetails.cntComments);
                    $scope.shareimagePath = fsc.ImgDetails.imagePath;
//                    alert("$rootScope.imageToZoom"+$rootScope.imageToZoom);
                    //alert("$scope.shareimagePath: "+$scope.shareimagePath);
                    if(!fsc.ImgDetails.des)
                    {
                        $scope.showPara = false;
                    }
                    console.log("fsc.ImgDetails", fsc.ImgDetails);
                    fsc.like=fsc.ImgDetails.liked;
                    console.log('imgDetails userID: ',fsc.ImgDetails.uid);
                    fsc.likeClr();
                },
                function (error) {
                    console.log("Error comments", error);
                 });

	};

        fsc.loginPopup = function() {
            var confirmPopup = $ionicPopup.confirm({
              title: 'Login',
              //template: 'Are you sure you want to delete this Post?',
              templateUrl:'PopUps/LoginPopUp.html',
              cssClass: '', // String, The custom CSS class name
              cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
              cancelType: '',//'button button-small button-default', // String (default: 'button-default'). The type of the Cancel button.
              okText: '', // String (default: 'OK'). The text of the OK button.
              okType: ' button-upload' // String (default: 'button-positive'). The type of the OK button.
            });
            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
                $location.path('app/login');

              } else {
                console.log('You are not sure');
              }
            });
          };
          
        
        //like
        fsc.likeClr=function(){
            if(fsc.like===true)
            {
               fsc.color="red";
            }
            else{
                fsc.color="#444";
            }
            return(fsc.color);
        };
        
//        fsc.checkLoginforShare=function(imgPath){
//        var MyID=$rootScope.sessionMyID;
//               // console.log('inide checkLogin() myid:',MyID);
//               // console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);
//        
//            if(!MyID)
//            {
//                fsc.loginPopup();
//            }
//            else{
//           // $rootScope.IsLoggedIn=true;
//               console.log('IsLoggedIn:',$rootScope.IsLoggedIn);
//               share(imgPath);
//            }
//        };
        
    fsc.ClickedLiked=function(){
            
            $scope.loadingLike = true;
                console.log("fsc.ImgDetails.cntLikes"+ fsc.ImgDetails.cntLikes);
//                if ($rootScope.sessionMyID) {
        if ($localstorage.get('sessionMyID')) {
            $scope.loadingWheel();
            fsc.image = {
//			postID	:$rootScope.sessionImageID,
			postID	:$scope.fullsizeimageId,															// begining of response set used for scroll down
//			userID:$rootScope.sessionMyID//'55041c5ec20ec607edaf7729',
                        userID:$localstorage.get('sessionMyID')//'55041c5ec20ec607edaf7729'												// tagName used for filtering the response on toggle click
		};
            if (fsc.like) 
            {
                //callunlike
                //alert('called unlike');
                FullImgService.unlikeClicked(fsc.image).then(function (response) {
                fsc.like=false;
                fsc.likeClr();
                $scope.likesCount = $scope.likesCount - 1;
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
                //alert('called like');
                FullImgService.likeClicked(fsc.image).then(function (response) {
                fsc.like=true;
                fsc.likeClr();
                   $scope.likesCount = $scope.likesCount + 1;
                    //alert("$scope.likesCount" + $scope.likesCount);
                    $scope.loadingLike = false;
                    $ionicLoading.hide();
                },
                function (error) {
                    console.log("error in like", error);
                 });
               
            }    
            }
            else{
                    console.log('inside else of ClickedLiked())');
                    fsc.loginPopup();
            }

        };
        
        fsc.getCommentClickedImageId = function(imageid)
        {
            console.log("Comment clicked image id: " +imageid);
//          $rootScope.sessionCommentClickedImageID = imageid;
            $localstorage.set('sessionCommentClickedImageID',imageid);
        };
        
//        fsc.ClickedComment=function(){
//            var MyID=$localstorage.get('sessionMyID');
////            var MyID=$rootScope.sessionMyID;
//               // console.log('inide checkLogin() myid:',MyID);
//               // console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);
//        
//            if(!MyID)
//            {
//                fsc.loginPopup();
//            }
//            else
//            {
////                console.log('IsLoggedIn:',$rootScope.IsLoggedIn);
//                console.log('IsLoggedIn:',$localstorage.get('IsLoggedIn'));
////                fsc.getCommentClickedImageId($rootScope.sessionImageID);
//                fsc.getCommentClickedImageId($scope.fullsizeimageId);
//                $location.path("app/comment");
//            }
//            
//        };       
        //facebook
        $scope.sharePopup = function() {
            $ionicPopup.alert({
              title: 'Success',
              template: 'This item has been shared on facebook',
              okType: ' button-upload'
            });
        };
        $scope.shareFacebook = function (postDetails) {
//                console.log("inside share");
//            alert("imageshare"+ imgPath);
                console.log("postdetails: ",postDetails);
            var MyID=$localstorage.get('sessionMyID');
            if(!MyID)
            {
                $scope.loginPopup();
            }
            else{
           $scope.loadingWheel();
           OpenFB.get('/me')
               .success(function (user) {
//                   alert("token refreshed");
            });
               console.log('MyID:',$localstorage.get('sessionMyID'));
  
                $scope.item = {
                    picture: postDetails.imagePath,
                    link: 'http://mehndistar.com/#/app/FullSizeFb/'+ postDetails.postId
                };

                OpenFB.post('/me/feed', $scope.item)
                    .success(function () {
//                        alert("This item has been shared on facebook");
                        $scope.loading = false;
                        $ionicLoading.hide();
                        $scope.sharePopup();
                    })
                    .error(function(data) {
//                        $scope.errorPopup(data.error.message);
                        $scope.errorPopup("Your tokan has expired! You need to relogin to MehendiSTAR to share this design on Facebook");
                        $scope.loading = false;
                        $ionicLoading.hide();
                    });
            }
        };
        fsc.gotoZoom = function()
        {
                    console.log("gotoZoom");
//            $rootScope.imageToZoom = $scope.shareimagePath;
            $localstorage.set('imageToZoom',$scope.shareimagePath);
            $rootScope.controlzoom = localStorage.getItem("controlZoom");
//            alert($rootScope.controlzoom);
            if($rootScope.controlzoom === 'zoomImageController')
            $location.path('app/zoomImage');
            if($rootScope.controlzoom === 'ZoomDesktopController')
            $location.path('app/ZoomDesktop');
        };

//var fsc = this;
        
        fsc.posts = 
        {
//            postID : $rootScope.sessionCommentClickedImageID
              postID : $scope.fullsizeimageId
        };
        console.log("post you commented on: " + fsc.posts.postID)
//        $scope.var={};
        fsc.PostsResult=[];
        console.log("called");
        commentsService.comments(fsc.posts).then(function (response) {
            fsc.PostsResult = response.data;
            $scope.msg=fsc.PostsResult.msg;
            if(!$scope.msg)
            {
                for (var i = 0; i < response.data.length; i++) {
                    var dateStr = new Date(response.data[i].commentDate);
                    var dateToShow = CommonServiceDate.getPostDate(dateStr);
                    response.data[i].uploadDate = dateToShow;
                }
            }
            if($scope.commentClick === 'true')
            {
                $scope.commentClickChk = true;
                $scope.$on('$ionicView.afterEnter', function(){
                    $ionicScrollDelegate.scrollBottom(true);
                });
//                 $timeout(function(){
//                    $ionicScrollDelegate.scrollBottom(true);
//                });
            }
            $scope.loading = false;
            $ionicLoading.hide();
            console.log("comments", fsc.PostsResult);
            console.log("$scope.msg",$scope.msg);
        },
        function (error) {
            console.log("Error comments", error);
         });
        
        fsc.getComments = function(){
                    $scope.loadingWheel();
                    console.log("inside comments page : " +$scope.fullsizeimageId)
                    fsc.posts = 
                            {
                                postID : $scope.fullsizeimageId
                            };
		console.log("I recieve POST ID : " + $scope.fullsizeimageId);

        commentsService.comments(fsc.posts).then(function (response) {
            fsc.PostsResult = response.data;
            $scope.msg=fsc.PostsResult.msg;
            if(!$scope.msg)
            {
                for (var i = 0; i < response.data.length; i++) {
                    var dateStr = new Date(response.data[i].commentDate);
                    var dateToShow = CommonServiceDate.getPostDate(dateStr);
                    response.data[i].uploadDate = dateToShow;
                }
            }
//            $ionicScrollDelegate.scrollTop();
            $ionicScrollDelegate.scrollBottom();
            $scope.loading = false;
            $ionicLoading.hide();
            console.log("comments", fsc.PostsResult);
        },
        function (error) {
            console.log("Error comments", error);
         });

	};
        
        fsc.postComment = function(){
            console.log("post comment");
            var MyID=$localstorage.get('sessionMyID');
            if(!MyID)
            {
                $scope.loginPopup();
            }
            else
            {
                $scope.loadingWheel();
                fsc.posts.postID = $scope.fullsizeimageId;
                fsc.posts.userID = $localstorage.get('sessionMyID');
                fsc.posts.comment = fsc.comment;

                console.log("POST ID : " + fsc.posts.postID);
                console.log("USER ID : " + fsc.posts.userID);
                console.log("Comments : " + fsc.posts.comment);
                if(!fsc.posts.comment)
                {
                    $scope.errorPopup("Write Comment..");
                    $scope.loading = false;
                    $ionicLoading.hide();
                }
                else
                {
                    commentsService.PostcommentService(fsc.posts).then(function (response) {
                            fsc.PostsResult = response.data;
                            $scope.commentsCount = $scope.commentsCount + 1;
                            $scope.loading = false;
        //            $ionicLoading.hide();
                            console.log("comments", fsc.PostsResult);
                            fsc.getComments();
                            fsc.comment = "";
                            
                        },
                        function (error) {
                            console.log("Error comments", error);
                        });
                }
            }
	};
    }]);