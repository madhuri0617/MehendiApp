angular.module('starter.controllers')
/*========================================autocomplete==========================================*/
.factory('DesignRetriever', function($http, $q, $timeout){
  var DesignRetriever = new Object();

  DesignRetriever.getdesigns = function(i) {
    var designdata = $q.defer();
    var designs;

    var moreDesigns = ["Hand Design", "Feet Design","Indian","Pakistani","Moghlai","Arabic","Indo-Arabic","Bridal","Common"];

    if(i && i.indexOf('T')!==-1)
      designs=moreDesigns;
    else
      designs=moreDesigns;

    $timeout(function(){
      designdata.resolve(designs);
    },1000);

    return designdata.promise;
  };

  return DesignRetriever;
})
 .controller('SearchDesignsController', function($ionicLoading,$scope, DesignRetriever,searchService,$ionicScrollDelegate){
//$scope.loading = true;
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        function setTabClass() {
           angular.element(document.querySelector("#tabSearch")).addClass("active");
           angular.element(document.querySelector("#tabHome")).removeClass("active");
           angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
         };
         setTabClass();
        //$scope.loadingWheel();
  $scope.designs = DesignRetriever.getdesigns("...");
  $scope.designs.then(function(data){
    $scope.designs = data;
    $scope.searchPosts = {};
  });

  $scope.getdesigns = function(){
    return $scope.designs;
  };

  $scope.doSomething = function(typedthings){
//    console.log("Do something like reload data with this: " + typedthings );
    $scope.newdesigns = DesignRetriever.getdesigns(typedthings);
    $scope.newdesigns.then(function(data){
      $scope.designs = data;
    });
    $scope.doSomethingElse(typedthings);
  };

  $scope.doSomethingElse = function(suggestion){
     // $scope.loadingWheel();
//    console.log("Suggestion selected: " + suggestion );
    
      $scope.tag = {
			beg : 0,																// begining of response set used for scroll down
			tagName : [suggestion],
                         userID : $scope.MyId 
		};
                   searchService.search($scope.tag).then(function (response) {
                    $scope.searchPosts = response.data;
                    $ionicScrollDelegate.scrollTop();
                   // $scope.loading = false;
                   // $ionicLoading.hide();
                    if ($scope.searchPosts === 'SUCCESS') {
                            $scope.success = true;
                            console.log("Success" + $scope.success);
                    }

                    console.log("searched : ", $scope.searchPosts);
                },
                function (error) {
                    console.log("Error in search", error);
                 });     
  };

});


