// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var baseURL = 'http://api-ratemymehendi.rhcloud.com';


var app = angular.module('starter', ['ionic','openfb','starter.controllers','ngCordova','appFilereader','autocomplete','Services','ngStorage','ionic.utils'])

.run(['$rootScope', '$ionicPlatform','OpenFB','$localStorage','$localstorage',function($rootScope, $ionicPlatform,OpenFB,$localStorage,$localstorage) {
//        $localStorage.sessionMyID='55041cadc20ec607edaf772a';
//    $localstorage.set('sessionMyID', '55388ab0606c800e93237bdd');
     $localstorage.set('sessionMyID', '556eef2d2849ea7379182f2a');
//    $localstorage.set('IsLoggedIn', 'true');
        //$localStorage.IsLoggedIn = true;
    $rootScope.sessionMyID=$localstorage.get('sessionMyID');
    console.log("$rootScope.sessionMyID",$rootScope.sessionMyID);
    $rootScope.IsLoggedIn=$localstorage.get('IsLoggedIn');
        console.log("$rootScope.IsLoggedIn",$rootScope.IsLoggedIn);
    
   // OpenFB.init('633219260143764','http://192.168.2.138:8100/');
   OpenFB.init('896457927079961','http://192.168.2.138:8100/oauthcallback.html');
  // OpenFB.init('633219260143764','http://192.168.2.138:8100/accesstoken');

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}]);


/*===================================== redireciton =============================== */
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    cache:false,
    views: {
      'menuContent': {
        templateUrl: "templates/search/search.html",
        controller: "SearchDesignsController"
      }
    }
  })
  
      .state('app.camera', {
        cache:false,
        url: "/camera",
        views: {
            'menuContent': {
                templateUrl: "templates/camera/camera.html",
                controller: "CameraCtrl"
            }
        }
    })

    .state('app.comment', {
    cache:false,
    url: "/comment",
    views: {
      'menuContent': {
        templateUrl: "templates/comment/comment.html",
        controller: "CommentCtrl as cmt"
      }
    }
  })  
  
      .state('app.galleryUpload', {
    cache:false,
    url: "/galleryUpload",
    views: {
      'menuContent': {
        templateUrl: "templates/galleryUpload/galleryUpload.html",
        controller:"GalleryUploadCtrl"
      }
    }
  }) 
  
  .state('app.login', {
    url: "/login",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
        controller: "LoginCtrl"
        
      }
    }
  })
  .state('app.MyProfile', {
    cache:false,
    url: "/MyProfile",
    views: {
      'menuContent': {
        templateUrl: "templates/myProfile/MyProfile.html",
        controller:'MyProfileDetailsCtrl as mpc'
      }
    }
  })
  
    
  
  .state('app.EditUploadedPicDetails', {
    cache:false,
    url: "/EditUploadedPicDetails",
    views: {
      'menuContent': {
        templateUrl: "templates/EditPic/EditUploadedPicDetails.html",
        controller:"EditPicCtrl as epc"
      }
    }
  })
   .state('app.DpChangeCamera', {
    cache:false,
    url: "/DpChangeCamera",
    views: {
      'menuContent': {
        templateUrl: "templates/EditDp/DpChangeCamera.html",
        controller : "EditDpCtrl"
      }
    }
  })
  .state('app.DpChangeGallery', {
    cache:false,
    url: "/DpChangeGallery",
    views: {
      'menuContent': {
         templateUrl: "templates/EditDp/DpChangeGallery.html",
        controller:'EditDpCtrl'
      }
    }
  })
    .state('app.home', {
      cache:false,
      url: "/home/:tagNm",
      views: {
        'menuContent': {
          templateUrl: "templates/home/home.html",
          controller: 'AppCtrl'
        }
      }
    })
   
    
    .state('app.FullSizeImage', {
      cache:false,
      url: "/FullSizeImage",
      views: {
        'menuContent': {
          templateUrl: "templates/FullSizeImage/FullSizeImage.html",
          controller:'FullSizeImgCtrl as fsc'
          }
      }
    })

    .state('app.userProfile', {
      cache:false,
      url: "/userProfile",
      views: {
        'menuContent': {
          templateUrl: "templates/userProfile/userProfile.html",
          controller:'uploaderCtrl as uc'
          }
      }
    }) 
    
    .state('app.aboutUs', {
      cache:false,
      url: "/aboutUs",
      views: {
        'menuContent': {
          templateUrl: "templates/aboutUs.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home/Common');
});

