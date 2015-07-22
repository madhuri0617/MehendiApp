angular.module('starter.controllers')
.controller('zoomImageController',['$rootScope','$localstorage','$scope','$log',function zoomImageController($rootScope,$localstorage,$scope,$log)
{
    $rootScope.zoomImagePage = true;
    $localstorage.set('FromPage','app/zoomImage');
//  $localstorage.set('zoomImagePage',true)
//  $rootScope.zoomImagePage = $localstorage.get('zoomImagePage');
    $log.debug("$rootScope.zoomImagePage"+$rootScope.zoomImagePage);
    $log.debug("inside zoomImageController"); 
//  alert($rootScope.imageToZoom);
    $('#img').attr('src',  $localstorage.get('imageToZoom'));
    function wlCommonInit(){
         $(".panzoom-elements").panzoom({ });
    }
    wlCommonInit();
}]);


