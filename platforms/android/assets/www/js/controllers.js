angular.module('starter.controllers', ['ionic'])

//['$scope', '$rootScope', '$timeout', '$window', '$modal', '$http', 'competencyService', function ($scope, $rootScope, $timeout, $window, $modal, $http, competencyService
.controller('AppCtrl',function($scope,$rootScope,OpenFB,$location,$stateParams,CommonServiceDate,homeService,$ionicPopup,$ionicScrollDelegate,$ionicLoading,$localstorage,FullImgService) {

    $rootScope.zoomImagePage = false;
//      $localstorage.set('zoomImagePage','false');
//        $localstorage.set('RedirectFromFb','true');
//            console.log("redirect in controller@@@@@@: "+$localstorage.get('RedirectFromFb'));
//            $rootScope.fromFB = $localstorage.get('RedirectFromFb');
    $scope.tagFromURL = $stateParams.tagNm ;
    $scope.blank="";
    $scope.mobile = localStorage.getItem("mobile");
//    alert($scope.mobile)
        $scope.loading = true;
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
  
//        $scope.loadingWheel();
        function setTabClass() {
           angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
           angular.element(document.querySelector("#tabHome")).addClass("active");
         };
         setTabClass();
        console.log("$scope.loading"+$scope.loading)
//        $rootScope.FromPage='app/home';
         $localstorage.set('FromPage','app/home');
      console.log("tag from url" , $scope.tagFromURL);
       $scope.MyId ;
       

       if ((typeof $localstorage.get('sessionMyID'))=== 'undefined') {
               $scope.MyId='';
            }
            else{
                $scope.MyId=$localstorage.get('sessionMyID');
            }

//if ((typeof $rootScope.sessionMyID)=== 'undefined') {
//               $scope.MyId='';
//            }
//            else{
//                $scope.MyId=$rootScope.sessionMyID;
//            }

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
                console.log('You are sure');
                angular.element(document.querySelector("#tabMyprofile")).addClass("active");
                angular.element(document.querySelector("#tabUpload")).removeClass("active");
                angular.element(document.querySelector("#tabCamera")).removeClass("active");
                angular.element(document.querySelector("#tabSearch")).removeClass("active");
                angular.element(document.querySelector("#tabHome")).removeClass("active");
                $location.path('app/login');

              } else {
                console.log('You are not sure');
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
//          $scope.Posts = [];
          $scope.postsAvailable = false;
        $scope.totalPosts = 0;
        $scope.getPopular1 = function(tagNm)
        {
                console.log("tag",tagNm);
        };
        $scope.getPopular = function(tagNm)
        {
                console.log("called getpopular");// call to get the popular post on page load and on toggle click and scroll down
                //console.log(tagNm);
                $scope.populartab = true;
                $scope.loadingWheel();
                $location.path("app/home/"+tagNm);
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
//                    }
                    $ionicScrollDelegate.scrollTop();
                    $scope.loading = false;
                    $ionicLoading.hide();
                    console.log("$scope.loading"+$scope.loading)
                    //console.log("popular", $scope.Posts,$scope.Posts.length);

                },
                function (error) {
                    //alert("error at popular: "+error);
                    console.log("Error popular", error);
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
//        alert("loadmore")
        $scope.moredesigns = false;
        console.log("loadmoredata:    @@@@@@: ",$scope.Posts );
        $scope.Posts.push($scope.dumy[$scope.counter]);
        $scope.counter += 1;   
        console.log("$scope.Posts.length @@@@@@ :",$scope.Posts.length,$scope.totalPosts);
        if($scope.Posts.length === $scope.totalPosts)
        {
            $scope.moredata=true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

//        $scope.getPopular($scope.tagFromURL);
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
                console.log("called",tabNum);
             if(tabNum === 2)
             {
                var MyID=$localstorage.get('sessionMyID');
                console.log('inide checkLogin() myid:',MyID);
                console.log('inide checkLogin() $localstorage.get("sessionMyID"):)',$localstorage.get('sessionMyID'));

//                var MyID=$rootScope.sessionMyID;
//                console.log('inide checkLogin() myid:',MyID);
//                console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);

                if(!MyID)
                {
                    $scope.loginPopup();
                    console.log("call loginpopup");
                    angular.element(document.querySelector("#tabHome")).removeClass("active");
                }
                else
                {
                    $location.path("app/galleryUpload");
                }
             }
             if(tabNum === 3)
             {
                var MyID=$localstorage.get('sessionMyID');
                console.log('inide checkLogin() myid:',MyID);
                console.log('inide checkLogin() $localstorage.get("sessionMyID"):)',$localstorage.get('sessionMyID'));

//                var MyID=$rootScope.sessionMyID;
//                console.log('inide checkLogin() myid:',MyID);
//                console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);
                if(!MyID)
                {
                    $scope.loginPopup();
                    console.log("call loginpopup");
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
                    $location.path("app/MyProfile");
                }
             }
           initTabs();
           tabClasses[tabNum] = "active";
         };

         //Initialize
         initTabs();
         //$scope.setActiveTab(1);


        $scope.getRecent = function(tagNm){
            $scope.populartab = false;
            $scope.loadingWheel();
            $scope.recent = {
                    beg : 0,																// begining of response set used for scroll down
                    tagName : tagNm,
                    userID : $scope.MyId
            };
//            $http.post('http://api-ratemymehendi.rhcloud.com/recent', $scope.recent).success(function(response){
//                    $scope.Posts = response;
//                    console.log("Recent from appctrl" , response);
//            }).error(function(response){ console.log(response);});
                homeService.recent($scope.recent).then(function (response) {
//                    if(response.data[0].message)
//                    {
//                        alert(response.data[0].message);
//                        $scope.postsAvailable = false;
//                    }
//                    else
//                    { 
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
//                    }
                    $ionicScrollDelegate.scrollTop();
                    $scope.loading = false;
                    $ionicLoading.hide();
                    console.log("$scope.Posts",$scope.Posts,$scope.Posts.length);

//                console.log("recent", $scope.Posts);

			},
		function (error) {
			console.log("Error recent", error);
		});
	};
        $scope.getuid = function(uid) {
            console.log('userid:',uid);
            console.log('Myid:',$scope.MyId);
//          $rootScope.sessionUserID = uid;
            $localstorage.set('sessionUserID',uid);
            $location.path("app/userProfile/"+uid);
        };

        $scope.getimageid = function(imageid) {
            console.log(imageid);
//          $rootScope.sessionImageID = imageid;
            $localstorage.set('sessionImageID',imageid);
            $localstorage.set('commentClickedChk','false');
            $location.path("app/FullSizeImage/"+imageid);
        };
        $scope.getCommentClickedImageId = function(imageid)
        {
            console.log("Comment clicked image id: " +imageid);
//          $rootScope.sessionCommentClickedImageID = imageid;
            $localstorage.set('commentClickedChk','true');
//            alert($localstorage.get('commentClicked'));
            $location.path("app/FullSizeImage/"+imageid);
        };

  //facebook logout and revokepermission
        $scope.logout = function () {
            OpenFB.logout();
            $localstorage.remove('sessionMyID');
            $rootScope.sessionMyID=null;
            $scope.MyId='';
//            $rootScope.IsLoggedIn = false;
//            $localstorage.remove('IsLoggedIn');
            $localstorage.set('IsLoggedIn',false);
//            $localStorage.IsLoggedIn = false;

        
           $location.path('app/home');
            $scope.getPopular($scope.tagFromURL)

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

//        $scope.ClickedLikedHome = function (imgID){
//            console.log("image like clicked ", imgID);
//        };
        $scope.ClickedLikedHome = function (post){

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
                        if($scope.populartab === true)
                        {
                            $scope.loadingWheel();
//                            alert($stateParams.tagNm)
                            $scope.getPopular($stateParams.tagNm);
                        }
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
                        if($scope.populartab === true)
                        {
                            $scope.loadingWheel();
//                            alert($stateParams.tagNm)
                            $scope.getPopular($stateParams.tagNm);
                        }
                        $scope.loadingLike = false;
                        $ionicLoading.hide();
                    },
                    function (error) {
                        console.log("error in like", error);
                     });
                   
                }  
           }
        };

  // Perform the login action when the user submits the login form
//  $scope.doLogin = function() {
//    console.log('Doing login', $scope.loginData);
//
//    // Simulate a login delay. Remove this and replace with your login
//    // code if using a login system
//    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
//  };

})

.controller('MyProfileCtrl', function($scope, $ionicModal, $ionicPopup,OpenFB) {

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
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
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
         console.log('You are sure');
       } else {
         console.log('You are not sure');
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
//            alert("inside login controller",$localstorage.get('sessionMyID'));
            
            if($localstorage.get('sessionMyID'))
            {
//                alert("logged in user available", $localstorage.get('sessionMyID'));
                $localstorage.set('IsLoggedIn','true');
                $rootScope.IsLoggedIn=$localstorage.get('IsLoggedIn');;
                $location.path('app/MyProfile');
            }
            if(!$localstorage.get('sessionMyID'))
            {
                $localstorage.set('IsLoggedIn','false');
//                $localstorage.set('FromPage','app/login');
                $rootScope.IsLoggedIn=$localstorage.get('IsLoggedIn');
//                alert("NO logged in user available need to login: ",$localstorage.get('sessionMyID'));
            }
    $rootScope.zoomImagePage = false;
//        $localstorage.set('zoomImagePage','false');
        $scope.errorPopup = function(msg) {
            $ionicPopup.alert({
              title: 'Error',
              template: msg,
              okType: ' button-upload' 
          });
          };
          //alert("inside loginctrl");
        function setTabClass() {
           angular.element(document.querySelector("#tabMyprofile")).addClass("active");
           angular.element(document.querySelector("#tabCamera")).removeClass("active");
           angular.element(document.querySelector("#tabHome")).removeClass("active");
           angular.element(document.querySelector("#tabUpload")).removeClass("active");
           angular.element(document.querySelector("#tabSearch")).removeClass("active");
           
         };
         setTabClass();
//        var userName = req.body.userName;
//	var email = req.body.email;
//	var gender = req.body.gender;
//	var fbId = req.body.fbId;

        $scope.facebookLogin = function () {
            OpenFB.login('email,read_stream,publish_actions').then(
                function () {
                     OpenFB.get('/me')
                        .success(function (user) {
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
                        //$scope.me.gender=user.gender;
                      //  alert('id= '+user.id+' name= '+user.name+' email= '+user.email+' gender= '+user.gender+' age= '+user.age);
                        $http.post('http://api.mehndistar.com/login',$scope.me).success(function(response)
                        {
                           // alert('inside sucess');
                            //alert(response);
                            $scope.Myid=response._id;//'55041c5ec20ec607edaf7729';
                          //  alert("response in success: ",$scope.MyDetails);
//                            alert("given id:"+ $scope.Myid);
                            
                             $rootScope.sessionMyID=$scope.Myid;
//                            $localstorage.set('sessionMyID',$rootScope.sessionMyID);

                            $localstorage.set('sessionMyID',$scope.Myid);
//                            alert($localstorage.get('sessionMyID'));
//                            $rootScope.IsLoggedIn=true;
                            $localstorage.set('IsLoggedIn',true);
                            //$localStorage.IsLoggedIn=true;
                            //alert('localstorage value:'+$localstorage.get('sessionMyID'));
//                            $location.path($rootScope.FromPage);
                            $location.path($localstorage.get('FromPage'));
                           // $state.go('app.MyProfile');
//                            $location.path('app/MyProfile');
                                }).error(function(){
//                                   alert('inside error');
                               });

                        });
                },
                function () {
//                    $rootScope.IsLoggedIn=false;
                    $localstorage.set('IsLoggedIn','false');
                    var msg = 'FB login failed';
                    $scope.errorPopup(msg);
                });
    };




    })
    //controller for facebook persons
.controller('PersonCtrl', function ($scope, $stateParams, OpenFB) {
        OpenFB.get('/' + $stateParams.personId).success(function (user) {
            $scope.user = user;
            console.log('details '+user);

        });
    })
    /*================================== share post on fb ===============================*/
.controller("ShareController", function($ionicPopup,OpenFB,$localstorage,$ionicLoading,$scope, $cordovaSocialSharing) {
    
        $scope.sharePopup = function() {
            $ionicPopup.alert({
              title: 'Success',
              template: 'This item has been shared on facebook',
              okType: ' button-upload'
            });
    };
    //SHARE ON facebbok
          $scope.shareOnFacebook = function (postDetails) {
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
        console.log('inside whatsaap share');
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
