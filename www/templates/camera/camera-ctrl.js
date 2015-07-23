angular.module('starter.controllers')
.controller('CameraCtrl', ['$cordovaCamera', '$scope','$rootScope','cameraUploadService','$ionicScrollDelegate','$ionicLoading','$ionicPopup','$localstorage','$log', function CameraCtr($cordovaCamera, $scope,$rootScope,cameraUploadService,$ionicScrollDelegate,$ionicLoading,$ionicPopup,$localstorage,$log) {
    function setTabClass() {
        angular.element(document.querySelector("#tabCamera")).removeClass("active");
        angular.element(document.querySelector("#tabMyprofile")).addClass("active");
    };
    angular.element(document.querySelector("#tabCamera")).addClass("active");
    angular.element(document.querySelector("#tabHome")).removeClass("active");
    angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
    $scope.form={};
    $scope.loading = true;
    $localstorage.set('FromPage','app/camera');
    $scope.loadingWheel = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="circles"/>'
        });
    };
    $scope.uploadPopup = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Design uploaded',
          okType: ' button-upload'
        });
        alertPopup.then(function(res) {
            $scope.fileUpload = "";
        });
    };
    $scope.errorPopup = function(msg) {
        $ionicPopup.alert({
          title: 'Error',
          template: msg,
          okType: ' button-upload' 
        });
    };
    $scope.toggleGroup = function(group) {
       if ($scope.isGroupShown(group)) {
         $scope.shownGroup = null;
       } else {
         $scope.shownGroup = group;
       }
    };
    $scope.toggleGroup1 = function(group) {
        if ($scope.isGroupShown(group)=== true) {
          $scope.shownGroup = null;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
    $scope.check = function(tag)
    {
       if(tag.check===false)
       {
           tag.check = true;
       }
       else if(tag.check=== true)
       {
           tag.check = false;
       }
    };

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
            $('#Selectedimage').show();
            $('#Selectedimage').attr('src', "data:image/jpeg;base64,"+imageData);
//            alert(imageData);
            $scope.fileUpload = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            var msg = "An error occured: " + err;
            $scope.errorPopup(msg);
        });
    };  
    $scope.tagList=[{name:"Common",check:true,disable:true}];       
    var ogList=["Hand Design", "Feet Design","Indian","Pakistani","Moghlai","Arabic","Indo-Arabic","Bridal"];     
    for(var i=0;i<ogList.length;i++)
    {
        $scope.tagList.push({name:ogList[i],check:false});
    }    
    $scope.upload = function () 
    {
        var tagName=[];
        for(var i=0;i<$scope.tagList.length;i++)
        {
            if($scope.tagList[i].check)
            tagName.push($scope.tagList[i].name);
        }           
        if(!$scope.fileUpload)
        {
            var msg= "You have to Capture picture";
            $scope.errorPopup(msg);
            $scope.loading = false;
            $ionicLoading.hide();
        }
        else
        {
            $scope.loadingWheel();
            if(!$scope.form.form.desc)
            {
                $scope.form.form.desc = "";
            }
            var image = $scope.fileUpload;
            $scope.uploadCameraDetails = {
                    userID : $localstorage.get('sessionMyID'),																// begining of response set used for scroll down
                    imageData : image,													// tagName used for filtering the response on toggle click
                    desc : $scope.form.form.desc,
                    tagName : tagName
            };
//                
            //service call
            cameraUploadService.uploadCameraImage($scope.uploadCameraDetails).then(function (response) {
                $log.debug("uploadImage", response.data);
                $scope.uploadPopup();
                $scope.loading = false;
                $ionicLoading.hide();
                $ionicScrollDelegate.scrollTop();
                $('#Selectedimage').hide();
                 $('#Selectedimage').attr('src', "");
                $scope.form.form.desc = "";
                $scope.toggleGroup1(3);
                $('input:checkbox').removeAttr('checked');
                $scope.tagList=[{name:"Common",check:true,disable:true}];
                 var ogList=["Hand Design", "Feet Design","Indian","Pakistani","Moghlai","Arabic","Indo-Arabic","Bridal"];
                for(var i=0;i<ogList.length;i++)
                {
                   $scope.tagList.push({name:ogList[i],check:false});
                }
            },
            function (error) {
                $log.debug("Error uploadImage", error);
             });
        }
    };
}]);