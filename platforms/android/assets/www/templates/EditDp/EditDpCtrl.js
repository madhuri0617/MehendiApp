    angular.module('starter.controllers')
    .controller('EditDpCtrl', ['$http','$scope','$rootScope','EditDpService','$location','$state','$cordovaCamera','$ionicScrollDelegate','$ionicLoading','$ionicPopup','$localstorage', function EditDpCtrl($http,$scope,$rootScope,EditDpService,$location,$state,$cordovaCamera,$ionicScrollDelegate,$ionicLoading,$ionicPopup,$localstorage) 
   {
       //change dp:
//       $localstorage.set('zoomImagePage',false);
        $scope.fileUpload = $localstorage.get('currentPath');
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
//       function dataURItoBlob(dataURI) 
//       {
//            var byteString = atob(dataURI.split(',')[1]);
//            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
//
//            var ab = new ArrayBuffer(byteString.length);
//            var ia = new Uint8Array(ab);
//            for (var i = 0; i < byteString.length; i++)
//            {
//               ia[i] = byteString.charCodeAt(i);
//            }
//
//            var bb = new Blob([ab], { "type": mimeString });
//            return bb;
//        }
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
          
            if(!$scope.fileUpload)
            {
                    $scope.msg="You have to Capture Picture";
                    $scope.errorPopup($scope.msg);
            }
            else
            {
                $scope.loadingWheel();
                var photo = $scope.fileUpload;

//                var formData = new FormData();
//                  alert($rootScope.sessionMyID);
//                  alert(photo);

//$scope.uploadCameraDetails = {
//			userID : $rootScope.sessionMyID,															
//			imageData : photo											                       
//                };
//                console.log("userID"+$rootScope.sessionMyID);

                $scope.uploadCameraDetails = {
			userID : $localstorage.get('sessionMyID'),															
			imageData : photo											                       
                };
                console.log("userID"+$localstorage.get('sessionMyID'));
//                formData.append("userPhoto", photo );
//                formData.append("userID", $rootScope.sessionMyID);
                
                //service call
                EditDpService.uploadDpCamera($scope.uploadCameraDetails).then(function (response) {
                console.log("uploadImage", response.data);

                $scope.uploadPopup();
                $scope.form=null;
                $scope.loading = false;
                $ionicLoading.hide();
                $ionicScrollDelegate.scrollTop();
                //$location.path('app/MyProfile');
                },
                function (error) {
                    console.log("Error uploadImage", error);
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
//            if($scope.fileType.toLowerCase().indexOf("image")>-1)
//            {
                $scope.loadingWheel();
                var formData = new FormData();
    //            console.log("userID"+$rootScope.sessionMyID);
    //            formData.append("userPhoto", photo);
    //            formData.append("userID", $rootScope.sessionMyID);
                console.log("userID"+$localstorage.get('sessionMyID'));
                formData.append("userPhoto", photo);
                formData.append("userID", $localstorage.get('sessionMyID'));

                EditDpService.uploadDp(formData).then(function (response) {
                console.log("uploadImage", response.data);

                $scope.uploadPopup();
                $scope.form=null;
                $scope.loading = false;
                $ionicLoading.hide();
                $ionicScrollDelegate.scrollTop();
                //$('#Selectedimage').hide();
                //$location.path('app/MyProfile');
                },
                function (error) {
                    console.log("Error uploadImage", error);
                 });
//            }
//            else
//            {
//                $scope.msg="You have to Select image";
//                $scope.errorPopup($scope.msg);
//            }
        }        
    };
        $scope.validateImage = function(file){
            // console.log(file);
            var filetype = file.type.substring(0,file.type.indexOf('/'));
            console.log(filetype);
            if (filetype == "image") {
//                     $scope.uploadDisabled = false;
//                     alert($scope.uploadDisabled)
                    return true;
            }else{
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
        }
        $scope.filechange = function (ev, file) {
            console.log("event", ev);
            console.log("file", ev.target.files[0]);
            $scope.fileUpload = ev.target.files[0];
            if($scope.validateImage(ev.target.files[0]))
            {
                $scope.fileUpload = ev.target.files[0];
                $scope.fileType = ev.target.files[0].type;
    //            alert($scope.fileType);
    //        console.log("file upload: " , $scope.fileUpload )
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


