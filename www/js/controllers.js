angular.module('starter.controllers', ['ionic'])
.controller('AppCtrl',function($scope,$rootScope,OpenFB,$location,$stateParams,CommonServiceDate,homeService,$ionicPopup,$ionicScrollDelegate,$ionicLoading,$localstorage,FullImgService,$log) {   
    $log.debug("inside controller");
    $rootScope.zoomImagePage = false;
    $scope.tagFromURL = $stateParams.tagNm ;
    $scope.categoryFromURL = $stateParams.category;
            console.log($scope.categoryFromURL);
    $scope.blank="";
    $scope.mobile = localStorage.getItem("mobile");
    $scope.loading = true;
    
    $scope.loadingWheel = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="circles"/>'
        });
    };
    function setTabClass() {
       angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
       angular.element(document.querySelector("#tabHome")).addClass("active");
    };
    setTabClass();
    $localstorage.set('FromPage','app/home');
    $scope.MyId ;
    if ((typeof $localstorage.get('sessionMyID'))=== 'undefined') {
        $scope.MyId='';
    }
    else{
        $scope.MyId=$localstorage.get('sessionMyID');
    }
    $scope.loginPopup = function() {
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
            $log.debug('You are sure');
            angular.element(document.querySelector("#tabMyprofile")).addClass("active");
            angular.element(document.querySelector("#tabUpload")).removeClass("active");
            angular.element(document.querySelector("#tabCamera")).removeClass("active");
            angular.element(document.querySelector("#tabSearch")).removeClass("active");
            angular.element(document.querySelector("#tabHome")).removeClass("active");
            $location.path('app/login');

          } else {
            $log.debug('You are not sure');
          }
        });
    };
    $scope.successPopup = function(msg) {
      $ionicPopup.alert({
        title: 'Success',
        template: msg,
        okType: ' button-upload'
      });
    };
    $scope.errorPopup = function(msg) {
        $ionicPopup.alert({
          title: 'Error',
          template: msg,
          okType: ' button-upload' 
      });
    };
    $scope.postsAvailable = false;
    $scope.totalPosts = 0;
    $scope.getPopular1 = function(tagNm)
    {
            $log.debug("tag",tagNm);
    };
    $scope.getDesignsPopular = function(tagNm)
    {
        $location.path("app/home/"+ tagNm + "/popular");
    };
    $scope.getDesignsRecent = function(tagNm)
    {
        $location.path("app/home/"+ tagNm + "/recent");
    };
    $scope.getPopular = function(tagNm)
    {
        $scope.populartab = true;
        $scope.loadingWheel();
//        $location.path("app/home/"+tagNm + "/" + $scope.categoryFromURL);
        angular.element(document.querySelector("#tabUpload")).removeClass("active");
        angular.element(document.querySelector("#tabCamera")).removeClass("active");
        angular.element(document.querySelector("#tabSearch")).removeClass("active");
        angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
        angular.element(document.querySelector("#tabHome")).addClass("active");
        $scope.popular = {
                beg : 0,																// begining of response set used for scroll down
                tagName : tagNm,													// tagName used for filtering the response on toggle click
                userID : $scope.MyId
        };
        homeService.popular($scope.popular).then(function (response) {
            $scope.Posts = [];
            $scope.dumy = response.data;
            $scope.counter = 0;
            $scope.totalPosts = $scope.dumy.length;
            for (var i = 0; i < response.data.length; i++) {
                var dateStr = new Date(response.data[i].uploadDate);
                var dateToShow = CommonServiceDate.getPostDate(dateStr);
                response.data[i].uploadDate = dateToShow;
            }
            if($scope.totalPosts>20)
            {
                 for( ; $scope.counter<20; $scope.counter++)
                 {
                     $scope.Posts.push($scope.dumy[$scope.counter]);
                 }
            }
            else
            {
                $scope.Posts = response.data;
                $scope.moredata = true;
            }
            $scope.postsAvailable = true;
            $ionicScrollDelegate.scrollTop();
            $scope.loading = false;
            $ionicLoading.hide();
            $log.debug("popular", $scope.Posts,$scope.Posts.length);
        },
        function (error) {
            $log.debug("Error popular", error);
         });
    };

    $scope.filterEvenStartFrom = function (index) {
        return function (item) {
            return index++ % 2 === 1;
        };
    };
    $scope.moredata = false;
    $scope.moredesigns = false; 
    $scope.loadMoreData=function()
    {
        $scope.moredesigns = false;
        $log.debug("loadmoredata: ",$scope.Posts );
        $scope.Posts.push($scope.dumy[$scope.counter]);
        $scope.counter += 1;   
        $log.debug("$scope.Posts.length: ",$scope.Posts.length,$scope.totalPosts);
        if($scope.Posts.length === $scope.totalPosts)
        {
            $scope.moredata=true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
    var tabClasses;
    function initTabs() {
        tabClasses = ["","","","",""];
    }
    $scope.getTabClass = function (tabNum) {
        return tabClasses[tabNum];
    };
    $scope.setActiveTab = function (tabNum) {
        if(tabNum === 2)
        {
           $localstorage.set('FromPage','app/galleryUpload');
           var MyID=$localstorage.get('sessionMyID');
           if(!MyID)
           {
               $scope.loginPopup();
               angular.element(document.querySelector("#tabHome")).removeClass("active");
           }
           else
           {
               $location.path("app/galleryUpload");
           }
        }
        if(tabNum === 3)
        {
           $localstorage.set('FromPage','app/camera');
           var MyID=$localstorage.get('sessionMyID');
           if(!MyID)
           {
               $scope.loginPopup();
               angular.element(document.querySelector("#tabHome")).removeClass("active");
           }
           else
           {
               $location.path("app/camera");
           }
        }
        if(tabNum === 5)
        {
           var MyID=$localstorage.get('sessionMyID');
//                var MyID=$rootScope.sessionMyID;
           if(!MyID)
           {
               $location.path('app/login');
               angular.element(document.querySelector("#tabHome")).removeClass("active");
           }
           else
           {
               $location.path("app/MyProfile/posts");
           }
        }
        initTabs();
        tabClasses[tabNum] = "active";
    };
    //Initialize
    initTabs();
    $scope.getRecent = function(tagNm){
        $scope.populartab = false;
        $scope.loadingWheel();
//        $location.path("app/home/"+tagNm + "/" + category);
        $scope.recent = {
                beg : 0,																// begining of response set used for scroll down
                tagName : tagNm,
                userID : $scope.MyId
        };
        homeService.recent($scope.recent).then(function (response) {
            $scope.Posts = [];
            $scope.dumy = response.data;
            $scope.counter = 0;
            $scope.totalPosts = $scope.dumy.length;
            for (var i = 0; i < response.data.length; i++) {
                var dateStr = new Date(response.data[i].uploadDate);
                var dateToShow = CommonServiceDate.getPostDate(dateStr);
                response.data[i].uploadDate = dateToShow;
            }
            if($scope.totalPosts>20)
            {
                for( ; $scope.counter<20; $scope.counter++)
                {
                    $scope.Posts.push($scope.dumy[$scope.counter]);
                }
             }
             else
             {
                 $scope.Posts = response.data;
                 $scope.moredata = true;
             }
             $scope.postsAvailable = true;
            $ionicScrollDelegate.scrollTop();
            $scope.loading = false;
            $ionicLoading.hide();
                $log.debug("$scope.Posts",$scope.Posts,$scope.Posts.length);
        },
        function (error) {
                $log.debug("Error recent", error);
        });
    };
    if($scope.categoryFromURL === 'popular')
    {
        $scope.getPopular($scope.tagFromURL);
        $scope.IsPopularTabActive = true;
        $scope.IsRecentTabActive = false;  
    }
    else
    {
        $scope.getRecent($scope.tagFromURL);
        $scope.IsRecentTabActive = true;
        $scope.IsPopularTabActive = false;
    }
    
    $scope.getuid = function(uid) {
        $localstorage.set('sessionUserID',uid);
        $location.path("app/userProfile/"+uid+'/posts');
    };
    $scope.getimageid = function(imageid) {
        $localstorage.set('sessionImageID',imageid);
        $localstorage.set('commentClickedChk','false');
        $location.path("app/FullSizeImage/"+imageid);
    };
    $scope.getCommentClickedImageId = function(imageid){
        $localstorage.set('commentClickedChk','true');
        $location.path("app/FullSizeImage/"+imageid);
    };
    //facebook logout and revokepermission
    $scope.logout = function () {
        OpenFB.logout();
        $localstorage.remove('sessionMyID');
        $rootScope.sessionMyID=null;
        $scope.MyId='';
        $localstorage.set('IsLoggedIn',false);
        $location.path('app/home');
        $scope.getPopular($scope.tagFromURL);
    };
    $scope.revokePermissions = function () {
        OpenFB.revokePermissions().then(
            function () {
              //  $state.go('app.login');
            },
            function () {
                var msg = 'Revoke permissions failed';
                $scope.errorPopup(msg);
            });
    };
    $scope.ClickedLikedHome = function (post)
    {
        var MyID=$localstorage.get('sessionMyID');
        if(!MyID)
        {
            $scope.loginPopup();
        }
        else
        {
            var imgDetails = {
                     postID  : post._id,                        
                     userID:$localstorage.get('sessionMyID')//'55041c5ec20ec607edaf7729' 
            };
            if (post.liked) 
            {
                $scope.loadingWheel();
                FullImgService.unlikeClicked(imgDetails).then(function (response) {
                    post.liked=false;
                    post.cntLikes = post.cntLikes - 1;
                    if($scope.populartab === true)
                    {
                        $scope.loadingWheel();
                        $scope.getPopular($stateParams.tagNm);
                    }
                    $scope.loadingLike = false;
//                    $ionicLoading.hide();
                },
                function (error) {
                                $log.debug("error in unlike", error);
                 });                    
            }
            else
            {
                $scope.loadingWheel();
                FullImgService.likeClicked(imgDetails).then(function (response) {
                    post.liked=true;
                    post.cntLikes = post.cntLikes + 1;
                    if($scope.populartab === true)
                    {
                        $scope.loadingWheel();
                        $scope.getPopular($stateParams.tagNm);
                    }
                    $scope.loadingLike = false;
//                    $ionicLoading.hide();
                },
                function (error) {
                        $log.debug("error in like", error);
                });
            }  
           }
        };
})

.controller('MyProfileCtrl', function($scope, $ionicModal, $ionicPopup,OpenFB,$log) {
    $scope.IsPostTabActive=true;
    $ionicModal.fromTemplateUrl('EditProfilePicModal.html', {
        id: '1', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal1 = modal;
    });

//  $ionicModal.fromTemplateUrl('DeletePicModal.html', {
//    id: '2', // We need to use and ID to identify the modal that is firing the event!
//      scope: $scope,
//      backdropClickToClose: false,
//      animation: 'slide-in-up'
//    }).then(function(modal) {
//      $scope.oModal2 = modal;
//    });

    $scope.openModal = function(index) {
        if(index === 1) $scope.oModal1.show();
        else $scope.oModal2.show();
    };
    $scope.closeModal = function(index) {
        if(index === 1) $scope.oModal1.hide();
        else $scope.oModal2.hide();
    };
     /* Listen for broadcasted messages */
    $scope.$on('modal.shown', function(event, modal) {
        $log.debug('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
        $log.debug('Modal ' + modal.id + ' is hidden!');
    });
//    confirm dilog on delete
    $scope.showDeletePost = function() {
     var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Post',
        //template: 'Are you sure you want to delete this Post?',
        templateUrl:'PopUps/DeletePost.html',
        cssClass: '', // String, The custom CSS class name
        cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: '',//'button button-small button-default', // String (default: 'button-default'). The type of the Cancel button.
        okText: '', // String (default: 'OK'). The text of the OK button.
        okType: ' button-assertive' // String (default: 'button-positive'). The type of the OK button.
     });
     confirmPopup.then(function(res) {
        if(res) {
            $log.debug('You are sure');
        } else {
            $log.debug('You are not sure');
        }
     });
   };
   //geting details from facebook profile..
    OpenFB.get('/me').success(function (user) {
            $scope.user = user;
            //alert('id= '+user.id+' name= '+user.name+' email= '+user.email+' gender= '+user.gender);
    });
})

//controller for FACEBOOK LOGIN..
.controller('LoginCtrl', function ($ionicPopup,$http,$scope, $location, OpenFB,$rootScope,$localstorage) {
    $scope.me={};
    if($localstorage.get('sessionMyID'))
    {
        $localstorage.set('IsLoggedIn','true');
        $rootScope.IsLoggedIn=$localstorage.get('IsLoggedIn');;
        $location.path('app/MyProfile/posts');
    }
    if(!$localstorage.get('sessionMyID'))
    {
        $localstorage.set('IsLoggedIn','false');
//                $localstorage.set('FromPage','app/login');
        $rootScope.IsLoggedIn=$localstorage.get('IsLoggedIn');
//                alert("NO logged in user available need to login: ",$localstorage.get('sessionMyID'));
    }
    $rootScope.zoomImagePage = false;
    $scope.errorPopup = function(msg) {
        $ionicPopup.alert({
          title: 'Error',
          template: msg,
          okType: ' button-upload' 
      });
    };
    function setTabClass() {
       angular.element(document.querySelector("#tabMyprofile")).addClass("active");
       angular.element(document.querySelector("#tabCamera")).removeClass("active");
       angular.element(document.querySelector("#tabHome")).removeClass("active");
       angular.element(document.querySelector("#tabUpload")).removeClass("active");
       angular.element(document.querySelector("#tabSearch")).removeClass("active");

     };
    setTabClass();
    $scope.facebookLogin = function () 
    {
        OpenFB.login('email,read_stream,publish_actions').then(
            function () 
            {
                OpenFB.get('/me')
                .success(function (user) 
                {
                    $scope.user = user;
                   // $scope.me.fbId=user.id;
                   $scope.me.fbId='0';
                    $scope.me.userName=user.name;
                    $scope.me.email=user.email;
                    if(user.gender==='female')
                    {
                       $scope.me.gender='F';
                    }
                    else if (user.gender==='male')
                    {
                        $scope.me.gender='M';
                    }
                    else
                    {
                        $scope.me.gender='O';
                    }
                          //  alert('id= '+user.id+' name= '+user.name+' email= '+user.email+' gender= '+user.gender+' age= '+user.age);
                    $http.post('http://api.mehndistar.com/login',$scope.me).success(function(response)
                    {
                        $scope.Myid=response._id;                            
                        $rootScope.sessionMyID=$scope.Myid;
                        $localstorage.set('sessionMyID',$scope.Myid);
                        $localstorage.set('IsLoggedIn',true);
                        $location.path($localstorage.get('FromPage'));
                    }).error(function(){
    //                                   alert('inside error');
                        });
                });
            },
            function () {
//                    $rootScope.IsLoggedIn=false;
                $localstorage.set('IsLoggedIn','false');
                var msg = 'Facebook login failed';
                $scope.errorPopup(msg);
            });
    };
})
    //controller for facebook persons
.controller('PersonCtrl', function ($scope, $stateParams, OpenFB) {
    OpenFB.get('/' + $stateParams.personId).success(function (user) {
        $scope.user = user;
//        $log.debug('details '+user);
    });
})
    /*================================== share post on fb ===============================*/
.controller("ShareController", function($ionicPopup,OpenFB,$localstorage,$ionicLoading,$scope, $cordovaSocialSharing,$log) {
        $scope.sharePopup = function() {
            $ionicPopup.alert({
              title: 'Success',
              template: 'This item has been shared on facebook',
              okType: ' button-upload'
        });
    };
    //SHARE ON facebbok
    $scope.shareOnFacebook = function (postDetails) {
      $log.debug("postdetails: ",postDetails);
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
         $log.debug('MyID:',$localstorage.get('sessionMyID'));
          $scope.item = {
              picture: postDetails.imagePath,
              link: 'http://mehndistar.com/#/app/FullSizeFb/'+ postDetails._id
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
    $scope.shareonWhatsapp = function(imagePath) {
        $cordovaSocialSharing
       .shareViaWhatsApp("Shared via MehndiSTAR App",imagePath, "")
       .then(function(result) {
         // Success!
           //alert("Posted successfully on whatsApp");
       }, function(err) {
         // An error occurred. Show a message to the user
       });
    };
});
