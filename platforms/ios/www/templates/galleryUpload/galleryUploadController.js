
angular.module('starter.controllers')
.controller('GalleryUploadCtrl', ['$http','$scope','$rootScope','galleryUploadService','$location','$state','$ionicScrollDelegate','$ionicLoading','$ionicPopup',  function ($http,$scope,$rootScope,galleryUploadService,$location,$state,$ionicScrollDelegate,$ionicLoading,$ionicPopup){
        function setTabClass() {
           angular.element(document.querySelector("#tabUpload")).removeClass("active");

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
              template: 'You have to select image',
              okType: ' button-upload' 
          });
          };
       $scope.tagList=[{name:"Common",check:true,disable:true}];
       
       var ogList=["Hand Design", "Feet Design","Indian","Pakistani","Moghlai","Arabic","Indo-Arabic","Bridal"];
           
       for(var i=0;i<ogList.length;i++)
       {
           $scope.tagList.push({name:ogList[i],check:false});
       }
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
        var _upload = function (photo) {
           // alert(photo)
            var tagName=[];
             for(var i=0;i<$scope.tagList.length;i++)
            {
                if($scope.tagList[i].check)
                tagName.push($scope.tagList[i].name);
            }
//                console.log("$scope.tagList : ",$scope.tagList);
//                console.log("tagName : ",tagName);
//                    console.log("photo"+photo);
//                    console.log("$scope.form.form.desc"+$scope.form.form.desc);
                    if(!photo)
                    {
                        //alert("You have to select image");
                        $scope.errorPopup();
                    }
                    else
                    {
                        $scope.loadingWheel();
                        if(!$scope.form.form.desc)
                        {
                             $scope.form.form.desc="";
                        }
                        var formData = new FormData();
                        console.log("userID"+$rootScope.sessionMyID);
                        formData.append("userPhoto", photo);
                        formData.append("userID", $rootScope.sessionMyID);
                        formData.append("desc", $scope.form.form.desc);
                        formData.append("tagName", tagName);

                        galleryUploadService.uploadImage(formData).then(function (response) {
                        console.log("uploadImage", response.data);
                       // alert("Your image uploaded Successfully...");
                        $scope.uploadPopup();
                        $scope.loading = false;
                        $ionicLoading.hide();
                        $ionicScrollDelegate.scrollTop();
                        $('#Selectedimage').hide();
                        //$scope.form=null;
                        $scope.form.form.desc = "";
                        $scope.toggleGroup1(7);                       
                //        $scope.tag = null;
                      $('input:checkbox').removeAttr('checked');
                      $scope.tagList=[{name:"Common",check:true,disable:true}];

                       var ogList=["Hand Design", "Feet Design","Indian","Pakistani","Moghlai","Arabic","Indo-Arabic","Bridal"];

                       for(var i=0;i<ogList.length;i++)
                       {
                           $scope.tagList.push({name:ogList[i],check:false});
                       }
//                       $location.path('app/MyProfile');

                       //setTabClass();
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
                $('#Selectedimage').show();
            };
            reader.readAsDataURL($scope.fileUpload);
        }
        };
        $scope.upload = function () {          
            _upload($scope.fileUpload);
        };               
        
}]);



