angular.module('starter.controllers', ['ionic'])

//['$scope', '$rootScope', '$timeout', '$window', '$modal', '$http', 'competencyService', function ($scope, $rootScope, $timeout, $window, $modal, $http, competencyService
.controller('AppCtrl',function($scope,$rootScope,OpenFB,$location,$stateParams,$cordovaSocialSharing,homeService,$localStorage,$ionicPopup,$ionicScrollDelegate,$ionicLoading,$localstorage) {
//toggle more options
  $scope.tagFromURL = $stateParams.tagNm ;
        $scope.loading = true;
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        $scope.loadingWheel();
        function setTabClass() {
           angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
           angular.element(document.querySelector("#tabHome")).addClass("active");
         };
         setTabClass();
        console.log("$scope.loading"+$scope.loading)
        $rootScope.FromPage='app/home';
      console.log("tag from url" , $scope.tagFromURL);
       $scope.MyId ;

       if ((typeof $rootScope.sessionMyID)=== 'undefined') {
               $scope.MyId='';
            }
            else{
                $scope.MyId=$rootScope.sessionMyID;
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
//          $scope.Posts = [];
          $scope.postsAvailable = false;
        $scope.totalPosts = 0;
        $scope.getPopular1 = function(tagNm)
        {
                console.log("tag",tagNm);
        }
        $scope.getPopular = function(tagNm)
        {
                console.log("called getpopular");// call to get the popular post on page load and on toggle click and scroll down
                //console.log(tagNm);
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
//                   if(response.data[0].message)
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
        
    $scope.moredata = false;
    $scope.loadMoreData=function()
    {
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
                var MyID=$rootScope.sessionMyID;
                console.log('inide checkLogin() myid:',MyID);
                console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);

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
                var MyID=$rootScope.sessionMyID;
                console.log('inide checkLogin() myid:',MyID);
                console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);

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
                var MyID=$rootScope.sessionMyID;
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


        $scope.getRecent = function(tagNm){													// call to get the recent post on page load and on toggle click and scroll down
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
            $rootScope.sessionUserID = uid;
        };

        $scope.getimageid = function(imageid) {
            console.log(imageid);
            $rootScope.sessionImageID = imageid;
        };
        $scope.getCommentClickedImageId = function(imageid)
        {
            console.log("Comment clicked image id: " +imageid);
            $rootScope.sessionCommentClickedImageID = imageid;
        };

        //like

        //comment
//        $scope.loginPopup = function() {
//            var confirmPopup = $ionicPopup.confirm({
//              title: '<b style="font-size: 16px;">Login</b>',
//              //template: 'Are you sure you want to delete this Post?',
//              templateUrl:'PopUps/LoginPopUp.html',
//              cssClass: '', // String, The custom CSS class name
//              cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
//              cancelType: '',//'button button-small button-default', // String (default: 'button-default'). The type of the Cancel button.
//              okText: '', // String (default: 'OK'). The text of the OK button.
//              okType: ' button-assertive' // String (default: 'button-positive'). The type of the OK button.
//            });
//            confirmPopup.then(function(res) {
//              if(res) {
//                console.log('You are sure');
//                $location.path('app/login');
//
//              } else {
//                console.log('You are not sure');
//              }
//            });
//          };
//        $scope.checkLogin=function(postID){
//        var MyID=$rootScope.sessionMyID;
//
//                console.log('inide checkLogin() myid:',MyID);
//                console.log('inide checkLogin() $rootScope.sessionMyID:)',$rootScope.sessionMyID);
//
//            if(!MyID)
//            {
//                console.log(" inside login");
//                $scope.loginPopup();
//            }
//            else{
//                $scope.getCommentClickedImageId(postID);
//                $location.path("app/comment");
//               console.log('IsLoggedIn:',$rootScope.IsLoggedIn);
//            }
//        };

        //share
        $scope.shareonFB = function(imagePath) {
            $cordovaSocialSharing.shareViaFacebook("Shared via RateMyMehndi App", imagePath, "")
              .then(function(result) {
                //alert("This procedure will take some time! Check Progress in Notification window");
              }, function(err) {
                // An error occurred. Show a message to the user
                alert("Error occured while sharing on facebook or u dont have facebook app");
              });
        };
        $scope.shareonWhatsapp = function(imagePath) {
            $cordovaSocialSharing.shareViaWhatsApp("Shared via RateMyMehndi App",imagePath, "")
              .then(function(result) {
             // Success!
               //alert("Posted successfully on whatsApp");
           }, function(err) {
             // An error occurred. Show a message to the user
             alert("Error occured while sharing on watsapp");
           });
        };



  //facebook logout and revokepermission
   $scope.logout = function () {
            OpenFB.logout();
            $localstorage.remove('sessionMyID');
//            $localStorage.clear();
//            $sessionStorage.clear();
//            $ionicHistory.clearHistory();
//            $ionicHistory.clearCache();
            $rootScope.sessionMyID=null;
            $scope.MyId='';
            $rootScope.IsLoggedIn = false;
            $localStorage.IsLoggedIn = false;
            //alert("root sessionMyID: "+$rootScope.sessionMyID);
            //alert("local sessionMyID: "+$localstorage.get('sessionMyID'));
            //alert("root IsLoggedIn: "+$rootScope.IsLoggedIn);
            //alert("local IsLoggedIn: "+$localStorage.IsLoggedIn);
        
           $location.path('app/home');
            $scope.getPopular($scope.tagFromURL)
//             $scope.revokePermissions();
            //$state.go('app.login');

        };

        $scope.revokePermissions = function () {
            OpenFB.revokePermissions().then(
                function () {
                  //  $state.go('app.login');
                },
                function () {
                    alert('Revoke permissions failed');
                });
        };
        
        $scope.item = {};

        $scope.share = function (msg) {
            alert("imageshare"+ msg);
            OpenFB.post('/me/feed', msg)
                .success(function () {
                    alert = "This item has been shared on OpenFB";
                })
                .error(function(data) {
                    alert(data.error.message);
                });
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
.controller('LoginCtrl', function ($http,$scope, $location, OpenFB,$rootScope,$localStorage,$localstorage) {
        $scope.me={};
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
            //alert("inside facebooklogin");
            //alert("root sessionMyID: "+$rootScope.sessionMyID);
            //alert("local sessionMyID: "+$localstorage.get('sessionMyID'));
            //alert("root IsLoggedIn: "+$rootScope.IsLoggedIn);
            //alert("local IsLoggedIn: "+$localStorage.IsLoggedIn);
        
            if(!$localstorage.get('sessionMyID')){
            //alert("yes all data blank chk");
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
                        $http.post('http://api-ratemymehendi.rhcloud.com/login',$scope.me).success(function(response)
                        {
                           // alert('inside sucess');
                            //alert(response);
                            $scope.Myid=response._id;//'55041c5ec20ec607edaf7729';
                          //  alert("response in success: ",$scope.MyDetails);
                            //alert("given id:"+ $scope.Myid);
                             $rootScope.sessionMyID=$scope.Myid;
                            $localstorage.set('sessionMyID',$rootScope.sessionMyID);
                            $rootScope.IsLoggedIn=true;
                            $localstorage.set('IsLoggedIn',$rootScope.IsLoggedIn);
                            //$localStorage.IsLoggedIn=true;
                            //alert('localstorage value:'+$localstorage.get('sessionMyID'));
                            $location.path($rootScope.FromPage);
                           // $state.go('app.MyProfile');
                            //$location.path('app/MyProfile');
                                }).error(function(){
                                   alert('inside error');});

                        });

                   //$location.path($rootScope.state)

                    //$location.path('/app/person/me/feed');
                },
                function () {
                     $rootScope.IsLoggedIn=false;
                    alert('FB login failed');
                });
        }
        else{
            //alert("root sessionMyID"+$rootScope.sessionMyID);
            //alert("local sessionMyID"+$localstorage.get('sessionMyID'));
            //alert("root IsLoggedIn"+$rootScope.IsLoggedIn);
            //alert("local IsLoggedIn"+$localStorage.IsLoggedIn)
        }
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
.controller("ShareController", function($scope, $cordovaSocialSharing) {
    
    $scope.shareonFB = function(imagePath) {
        console.log('inside fb share');
        $cordovaSocialSharing.shareViaFacebook("Shared via RateMyMehndi App", imagePath, "")
          .then(function(result) {
            //alert("This procedure will take some time! Check Progress in Notification window");
          }, function(err) {
            // An error occurred. Show a message to the user
            alert("You need a facebook App for sharing this post or u dont have facebook app");
          });
    };
    $scope.shareonWhatsapp = function(imagePath) {
        console.log('inside whatsaap share');
        $cordovaSocialSharing
       .shareViaWhatsApp("Shared via RateMyMehndi App",imagePath, "")
       .then(function(result) {
         // Success!
           //alert("Posted successfully on whatsApp");
       }, function(err) {
         // An error occurred. Show a message to the user
       });
    };
});
