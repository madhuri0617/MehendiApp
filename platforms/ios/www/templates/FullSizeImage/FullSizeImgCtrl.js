    angular.module('starter.controllers')
    .controller('FullSizeImgCtrl', ['OpenFB','$http','$scope','$rootScope','FullImgService','$ionicPopup','$location','$cordovaSocialSharing','$ionicLoading', function(OpenFB,$http,$scope,$rootScope,FullImgService,$ionicPopup,$location,$cordovaSocialSharing,$ionicLoading)
    {      
        $scope.loading = true;
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
        var fsc = this;
        $scope.showPara = true;
        $rootScope.FromPage='app/FullSizeImage';
        //console.log("Image ID: " +$rootScope.sessionImageID);
        fsc.like='';
        fsc.MyId;
        console.log('transfered imgid:',$rootScope.sessionImageID);
            console.log('myid:',$rootScope.sessionMyID);
            
            if ((typeof $rootScope.sessionMyID)=== 'undefined') {
               fsc.MyId='';
            }
            else{
                fsc.MyId=$rootScope.sessionMyID;
            }
            //console.log('fsc.MyId:',fsc.MyId);
         fsc.getImage = function(){
                    
                    fsc.image = {
			postID	:$rootScope.sessionImageID,															
			userID:fsc.MyId//$rootScope.sessionMyID//'55041c5ec20ec607edaf7729'											
		};
 
		console.log("I recieve POST ID : " + fsc.image.postID);
		console.log("I recieve USER ID : " + fsc.image.userID);
                
                FullImgService.getImage(fsc.image).then(function (response) {
                    fsc.ImgDetails = response.data;
                    $scope.loading = false;
                    $ionicLoading.hide();
                    $scope.likesCount = fsc.ImgDetails.cntLikes;
                    
                    $rootScope.commentCount = fsc.ImgDetails.cntComments;
                    $scope.shareimagePath = fsc.ImgDetails.imagePath;
                    //alert("$scope.shareimagePath: "+$scope.shareimagePath);
                    if(!fsc.ImgDetails.des)
                    {
                        $scope.showPara = false;
                    }
                    console.log("fsc.ImgDetails", fsc.ImgDetails);
                    fsc.like=fsc.ImgDetails.liked;
                    console.log('isliked: ',fsc.ImgDetails.liked);
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
          
          //share fb
        fsc.share = function (imgPath) {
            //alert("imageshare"+ imgPath);
            var MyID=$rootScope.sessionMyID;
            if(!MyID)
            {
                fsc.loginPopup();
            }
            else{
           // $rootScope.IsLoggedIn=true;
               console.log('MyID:',$rootScope.sessionMyID);
                $scope.item = {
                    picture: imgPath
                };

                OpenFB.post('/me/feed', $scope.item)
                    .success(function () {
                        alert("This item has been shared on facebook");
                    })
                    .error(function(data) {
                        alert(data.error.message);
                    });
            }
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
            //alert('inside  ClickedLiked1');
                console.log("fsc.ImgDetails.cntLikes"+ fsc.ImgDetails.cntLikes);
        if ($rootScope.sessionMyID) {
            // alert('inside  ClickedLiked2');
            fsc.image = {
			postID	:$rootScope.sessionImageID,															// begining of response set used for scroll down
			userID:$rootScope.sessionMyID//'55041c5ec20ec607edaf7729'												// tagName used for filtering the response on toggle click
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
            $rootScope.sessionCommentClickedImageID = imageid;   
        };
        
        fsc.ClickedComment=function(){
            var MyID=$rootScope.sessionMyID;
               // console.log('inide checkLogin() myid:',MyID);
               // console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);
        
            if(!MyID)
            {
                fsc.loginPopup();
            }
            else
            {
                console.log('IsLoggedIn:',$rootScope.IsLoggedIn);
                fsc.getCommentClickedImageId($rootScope.sessionImageID);
                $location.path("app/comment");
            }
            
        };       

    }]);