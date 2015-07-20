
angular.module('starter.controllers')
//var myApp = angular.module('myApp', []);


//function MyCtrl($scope) {
//  // controller code here
//}

.directive('ngMouseWheelUp', function() {
        return function(scope, element, attrs) {
            element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                   
            	        // cross-browser wheel delta
            	        var event = window.event || event; // old IE support
            	        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            	
            	        if(delta > 0) {
                            scope.$apply(function(){
                                scope.$eval(attrs.ngMouseWheelUp);
                            });
                        
                          // for IE
                          event.returnValue = false;
                          // for Chrome and Firefox
                          if(event.preventDefault) event.preventDefault();                        
                       }
            });
        };
})


.directive('ngMouseWheelDown', function() {
        return function(scope, element, attrs) {
            element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                   
            	        // cross-browser wheel delta
            	        var event = window.event || event; // old IE support
            	        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            	
            	        if(delta < 0) {
                            scope.$apply(function(){
                                scope.$eval(attrs.ngMouseWheelDown);
                            });

                          // for IE
                          event.returnValue = false;
                          // for Chrome and Firefox
                          if(event.preventDefault) event.preventDefault();                        
                       }
            });
        };
})

    .controller('ZoomDesktopController',['$rootScope','$localstorage','$scope',function ZoomDesktopController($rootScope,$localstorage,$scope)
{
    $rootScope.zoomImagePage = true;
     $localstorage.set('FromPage','app/zoomImage');
//                $localstorage.set('zoomImagePage',true)
//                 $rootScope.zoomImagePage = $localstorage.get('zoomImagePage');
                 console.log("$rootScope.zoomImagePage"+$rootScope.zoomImagePage);
                 
                console.log("inside zoomDesktopController "+$rootScope.controlzoom ); 
//                alert($rootScope.imageToZoom);
                $('#img').attr('src',  $localstorage.get('imageToZoom'));
     $scope.initZoom = function()
     {
         $scope.zoomWidth = 600;
         $scope.imgStyle = {width:'600px'};
     };
     $scope.zoomDown = function()
     {
         if($scope.zoomWidth>600)
         {
         $scope.zoomWidth = $scope.zoomWidth - 20;
         }
         else
         {
            $scope.zoomWidth = 600; 
         }
         $scope.imgStyle.width = $scope.zoomWidth  +'px';
     };
     $scope.zoomUp  = function()
     {
         $scope.zoomWidth = $scope.zoomWidth + 20; 
         $scope.imgStyle.width = $scope.zoomWidth +'px'; 
     };                
}]);



