angular.module('starter.controllers')
.controller('zoomImageController',['$location','$rootScope','$localstorage','$scope','$log',function zoomImageController($location,$rootScope,$localstorage,$scope,$log)
{
    $scope.imagetoZoom = $localstorage.get('imageToZoom');
    if(!$scope.imagetoZoom)
    {
        $location.path('app/home/Common/popular');
    }
    else
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
    }
}]);


