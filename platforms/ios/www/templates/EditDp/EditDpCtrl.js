    angular.module('starter.controllers')
    .controller('EditDpCtrl', ['$http','$scope','$rootScope','EditDpService','$location','$state','$cordovaCamera','$ionicScrollDelegate','$ionicLoading','$ionicPopup', function EditDpCtrl($http,$scope,$rootScope,EditDpService,$location,$state,$cordovaCamera,$ionicScrollDelegate,$ionicLoading,$ionicPopup) 
   {
       //change dp:
       $('#Selectedimage').attr('src', $rootScope.currentPath);
       $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        $scope.uploadPopup = function() {
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: 'Your Profile pic uploaded successfully',
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
       function dataURItoBlob(dataURI) 
       {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++)
            {
               ia[i] = byteString.charCodeAt(i);
            }

            var bb = new Blob([ab], { "type": mimeString });
            return bb;
        }
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
                    $scope.fileUpload = dataURItoBlob("data:image/jpeg;base64,"+imageData);
            }, function (err) {
                alert("An error occured: " + err);
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

                var formData = new FormData();

                console.log("userID"+$rootScope.sessionMyID);
                formData.append("userPhoto", photo );
                formData.append("userID", $rootScope.sessionMyID);
                
                //service call
                EditDpService.uploadDp(formData).then(function (response) {
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
                    $scope.msg="You have to Select Picture";
                    $scope.errorPopup($scope.msg);
        }
        else
        {
            $scope.loadingWheel();
            var formData = new FormData();
            console.log("userID"+$rootScope.sessionMyID);
            formData.append("userPhoto", photo);
            formData.append("userID", $rootScope.sessionMyID);

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
        }
    };

        $scope.filechange = function (ev, file) {
            console.log("event", ev);
            console.log("file", file);
            $scope.fileUpload = ev.target.files[0];
        console.log("file upload: " , $scope.fileUpload )
             if ($scope.fileUpload) {
        var reader = new FileReader();
        reader.onload = function (e) {
        $('#Selectedimage').attr('src', e.target.result);
       // $('#Selectedimage').show();
    };
    reader.readAsDataURL($scope.fileUpload);
        }
        
        };
        $scope.upload = function () {
            console.log("$scope.fileUpload", $scope.fileUpload);
            _upload($scope.fileUpload);
        };
                
}]);


