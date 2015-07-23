    angular.module('starter.controllers')
    .controller('EditDpCtrl', ['$http','$scope','$rootScope','EditDpService','$location','$state','$cordovaCamera','$ionicScrollDelegate','$ionicLoading','$ionicPopup','$localstorage','$log', function EditDpCtrl($http,$scope,$rootScope,EditDpService,$location,$state,$cordovaCamera,$ionicScrollDelegate,$ionicLoading,$ionicPopup,$localstorage,$log) 
   {
       //change dp:
//       $localstorage.set('zoomImagePage',false);
        $scope.fileUpload = $localstorage.get('currentPath');
        $scope.mobile = localStorage.getItem("mobile");
       $('#Selectedimage').attr('src',$localstorage.get('currentPath'));
//       $('#Selectedimage').attr('src', $rootScope.currentPath);
       $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        $localstorage.set('FromPage','app/DpChangeGallery');
        $scope.uploadPopup = function() {
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: 'Your Profile photo uploaded',
              okType: ' button-upload'
            });
            alertPopup.then(function(res) {
                $scope.fileUpload = "";
                $location.path('app/MyProfile');
            });
        };
        $scope.errorPopup = function(msg) {
            $ionicPopup.alert({
              title: 'Error',
              template: msg,
              okType: ' button-upload' 
          });
        };
        $scope.form={};
        $scope.getPhoto = function () 
        {
            var options = { 
                quality : 75, 
                destinationType : Camera.DestinationType.DATA_URL, 
                sourceType : Camera.PictureSourceType.CAMERA, 
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                    $('#Selectedimage').attr('src', "data:image/jpeg;base64,"+imageData);
                    $scope.fileUpload = "data:image/jpeg;base64,"+imageData;
            }, function (err) {
                var msg = "An error occured: " + err;
                $scope.errorPopup(msg);
            });
        };      
        $scope.uploadCamera = function () {         
            if(!$scope.fileUpload || $scope.fileUpload === $localstorage.get('currentPath'))
            {
                    $scope.msg="You have to Capture Picture";
                    $scope.errorPopup($scope.msg);
            }
            else
            {
                $scope.loadingWheel();
                var photo = $scope.fileUpload;
                $scope.uploadCameraDetails = {
			userID : $localstorage.get('sessionMyID'),															
			imageData : photo											                       
                };
                $log.debug("userID"+$localstorage.get('sessionMyID'));
//                formData.append("userPhoto", photo );
//                formData.append("userID", $rootScope.sessionMyID);
                
                //service call
                EditDpService.uploadDpCamera($scope.uploadCameraDetails).then(function (response) {
                $log.debug("uploadImage", response.data);

                $scope.uploadPopup();
                $scope.form=null;
                $scope.loading = false;
                $ionicLoading.hide();
                $ionicScrollDelegate.scrollTop();
                //$location.path('app/MyProfile');
                },
                function (error) {
                    $log.debug("Error uploadImage", error);
                 });
            }
        };
      // $('#Selectedimage').hide();
        var _upload = function (photo) {
            if(!photo)
            {
                        $scope.msg="You have to Select image";
                        $scope.errorPopup($scope.msg);
            }
            else
            {
                $scope.loadingWheel();
                var formData = new FormData();
    //          $log.debug("userID"+$rootScope.sessionMyID);
                $log.debug("userID"+$localstorage.get('sessionMyID'));
                formData.append("userPhoto", photo);
                formData.append("userID", $localstorage.get('sessionMyID'));
                EditDpService.uploadDp(formData).then(function (response) {
                    $log.debug("uploadImage", response.data);
                    $scope.uploadPopup();
                    $scope.form=null;
                    $scope.loading = false;
                    $ionicLoading.hide();
                    $ionicScrollDelegate.scrollTop();
                    //$('#Selectedimage').hide();
                },
                function (error) {
                    $log.debug("Error uploadImage", error);
                });
            }        
        };
        $scope.validateImage = function(file){
            // $log.debug(file);
            var filetype = file.type.substring(0,file.type.indexOf('/'));
            $log.debug(filetype);
            if (filetype == "image") {
//                  scope.uploadDisabled = false;
//                  alert($scope.uploadDisabled)
                    return true;
            }
            else {
                $('#Selectedimage').attr('src', "");
                $('#Selectedimage').attr('alt', "");
//                    $scope.uploadDisabled = true;
                var html = '<p id="alert">Select Image file only.</p>';
                $(html).hide().prependTo(".chat-box").fadeIn(1500);
                // $('.chat-box').append(html).fadeIn('slow');
                $('#alert').delay(2000).fadeOut('slow', function(){
                        $('#alert').remove();
                });
                return false;
            }
        };
        $scope.filechange = function (ev, file) {
            $log.debug("event", ev);
            $log.debug("file", ev.target.files[0]);
            $scope.fileUpload = ev.target.files[0];
            if($scope.validateImage(ev.target.files[0]))
            {
                $scope.fileUpload = ev.target.files[0];
                $scope.fileType = ev.target.files[0].type;
    //          alert($scope.fileType);
    //          $log.debug("file upload: " , $scope.fileUpload )
                if ($scope.fileUpload) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#Selectedimage').attr('alt', "Select image");
                        $('#Selectedimage').attr('src', e.target.result);
                        // $('#Selectedimage').show();
                    };
                    reader.readAsDataURL($scope.fileUpload);
                }
            }      
        };
        $scope.upload = function () {
            if($scope.fileUpload !== $localstorage.get('currentPath'))
            {
                if($scope.validateImage($scope.fileUpload))
                {
    //                alert("upload");
                    _upload($scope.fileUpload);
                }
            }
            else
            {
                $scope.msg="You have to Select image";
                $scope.errorPopup($scope.msg);
            }
        };              
}]);


