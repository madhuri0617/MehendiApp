angular.module('starter.controllers')
.controller('CameraCtrl', ['$cordovaCamera', '$scope','$rootScope','galleryUploadService','$location','$ionicScrollDelegate','$ionicLoading','$ionicPopup', function CameraCtr($cordovaCamera, $scope,$rootScope,galleryUploadService,$location,$ionicScrollDelegate,$ionicLoading,$ionicPopup) {
     function setTabClass() {
           angular.element(document.querySelector("#tabCamera")).removeClass("active");
           angular.element(document.querySelector("#tabMyprofile")).addClass("active");
     };
        angular.element(document.querySelector("#tabHome")).removeClass("active");
        angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
    $scope.form={};
    $scope.loading = true;
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        $scope.uploadPopup = function() {
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: 'Your design uploaded successfully',
              okType: ' button-upload'
            });
            alertPopup.then(function(res) {
                $scope.fileUpload = "";
                //alert($scope.fileUpload);
            });
          };
          $scope.errorPopup = function() {
            $ionicPopup.alert({
              title: 'Error',
              template: 'You have to Capture picture',
              okType: ' button-upload' 
          });
          };
        $scope.toggleGroup = function(group) {
//                    console.log("inside toggleGroup" );
           if ($scope.isGroupShown(group)) {
             $scope.shownGroup = null;
           } else {
             $scope.shownGroup = group;
           }
         };
         $scope.toggleGroup1 = function(group) {
//                    console.log("inside toggleGroup" );
           if ($scope.isGroupShown(group)=== true) {
             $scope.shownGroup = null;
           }
         };
         $scope.isGroupShown = function(group) {
           return $scope.shownGroup === group;
         };
         $scope.check = function(tag)
         {
            console.log("inside check" , tag);
            if(tag.check===false)
            {
                tag.check = true;
            }
            else if(tag.check=== true)
            {
                tag.check = false;
            }
         };
       function dataURItoBlob(dataURI) 
       {
           alert(dataURI)
            var byteString = atob(dataURI.split(',')[1]); //base64 to string
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
            
            alert(imageData);
            $scope.fileUpload = dataURItoBlob("data:image/jpeg;base64,"+imageData);
            
            alert($scope.fileUpload);
            }, function (err) {
                alert("An error occured: " + err);
            });
        };
    
       $scope.tagList=[{name:"Common",check:true,disable:true}];       
       var ogList=["Hand Design", "Feet Design","Indian","Pakistani","Moghlai","Arabic","Indo-Arabic","Bridal"];     
       for(var i=0;i<ogList.length;i++)
       {
           $scope.tagList.push({name:ogList[i],check:false});
       }    
        $scope.upload = function () {
            var tagName=[];
            for(var i=0;i<$scope.tagList.length;i++)
            {
                if($scope.tagList[i].check)
                tagName.push($scope.tagList[i].name);
            }           
            alert("$scope.fileUpload"+$scope.fileUpload);
            if(!$scope.fileUpload)
            {
                $scope.errorPopup();
            }
            else
            {
                $scope.loadingWheel();
                if(!$scope.form.form.desc)
                {
                    $scope.form.form.desc = "";
                }
                console.log("$scope.form.form.desc"+$scope.form.form.desc);
                var photo = $scope.fileUpload;
                console.log("$scope.tagList : ",$scope.tagList);
                console.log("tagName : ",tagName);

                var formData = new FormData();

                console.log("userID"+$rootScope.sessionMyID);
                formData.append("userPhoto", photo );
                formData.append("userID", $rootScope.sessionMyID);
                formData.append("desc", $scope.form.form.desc);
                formData.append("tagName", tagName);
                //service call
                galleryUploadService.uploadImage(formData).then(function (response) {
                console.log("uploadImage", response.data);
                $scope.uploadPopup();
                $scope.loading = false;
                $ionicLoading.hide();
                $ionicScrollDelegate.scrollTop();
                $('#Selectedimage').hide();
                //$scope.form=null;
                $scope.form.form.desc = "";
                $scope.toggleGroup1(3);
                
        //        $scope.tag = null;
                $('input:checkbox').removeAttr('checked');
                $scope.tagList=[{name:"Common",check:true,disable:true}];

                 var ogList=["Hand Design", "Feet Design","Indian","Pakistani","Moghlai","Arabic","Indo-Arabic","Bridal"];


                for(var i=0;i<ogList.length;i++)
                {
                   $scope.tagList.push({name:ogList[i],check:false});
                }
                //$location.path('app/MyProfile');
                //setTabClass();
                },
                function (error) {
                    console.log("Error uploadImage", error);
                 });
            }
        };
}]);