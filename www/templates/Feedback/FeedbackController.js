/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('starter.controllers')
.controller('FeedbackCtrl', ['$http','$scope','$rootScope','$location','$ionicLoading','$ionicScrollDelegate','$ionicPopup','$localstorage','$log','feedBackService', function FeedbackCtrl($http,$scope,$rootScope,$location,$ionicLoading,$ionicScrollDelegate,$ionicPopup,$localstorage,$log,feedBackService) {  
        $log.debug("inside feedback controller");
           $scope.vr = {};
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        $scope.uploadPopup = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Feedback Submitted! Thank You!',
          okType: ' button-upload'
        });
        alertPopup.then(function(res) {
            $scope.fileUpload = "";
            //alert($scope.fileUpload);
        });
      };
      $scope.errorPopup = function(msg) {
        $ionicPopup.alert({
          title: 'Error',
          template: msg,
          okType: ' button-upload' 
        });
    };
        if($localstorage.get('sessionMyName')){
            $scope.vr.MyName = $localstorage.get('sessionMyName');
        }
//        $scope.MyName = $localstorage.get('sessionMyName');
        if($localstorage.get('sessionMyemail')){
            $scope.vr.MyEmail = $localstorage.get('sessionMyemail');
        }
//        $log.debug($scope.MyName);
//        $log.debug($scope.MyEmail);
//        if(!$scope.MyName)
//            $scope.MyName = "";
//        if(!$scope.MyEmail)
//            $scope.MyEmail = "";
        $scope.invalid = function()
        {
            
        };
        $scope.submitForm = function()
        {

        $scope.loadingWheel();
            $log.debug("inside submit");
            $log.debug("name *"+$scope.vr.MyName );
            $log.debug("email",$scope.vr.MyEmail);
            
            $log.debug("comments",$scope.vr.Comments);
//            $scope.textmail = {
//                Name: $scope.vr.MyName ,
//                email: $scope.vr.MyEmail,
//                comments: $scope.vr.Comments
//            };
            $scope.textmail = "Name: " + $scope.vr.MyName + "  Email: " + $scope.vr.MyEmail +
                    "  Comments: " + $scope.vr.Comments;
            $scope.Email = {
                    to : 'madhurijadhav0617@gmail.com',
                    subject: 'Feedback mail from server',
                    text: $scope.textmail
		};
            feedBackService.submitFeedback($scope.Email).then(function (response) {
                        $log.debug(response.data.success);
                        if(response.data.success === "true")
                        {
                            $scope.uploadPopup();
                            $scope.loadingLike = false;
                            $ionicLoading.hide();
                        }
                        else
                        {
                            $scope.msg = "Cannot submit your feedback now. Please try again later.";
                            $scope.errorPopup(msg);
                        }
                    },
                    function (error) {
                        $log.debug("error in feedback", error);
                    });
        };
}]);