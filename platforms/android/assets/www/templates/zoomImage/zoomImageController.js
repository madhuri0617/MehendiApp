angular.module('starter.controllers')
    .controller('zoomImageController',['$rootScope','$localstorage','$scope',function zoomImageController($rootScope,$localstorage,$scope)
{
    $rootScope.zoomImagePage = true;
     $localstorage.set('FromPage','app/zoomImage');
//                $localstorage.set('zoomImagePage',true)
//                 $rootScope.zoomImagePage = $localstorage.get('zoomImagePage');
                 console.log("$rootScope.zoomImagePage"+$rootScope.zoomImagePage);
                console.log("inside zoomImageController"); 
//                alert($rootScope.imageToZoom);
                $('#img').attr('src',  $localstorage.get('imageToZoom'));
               function wlCommonInit(){
                    $(".panzoom-elements").panzoom({ });
                }
                wlCommonInit();
}]);


