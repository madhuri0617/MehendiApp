 angular.module('starter.controllers')
 .controller('EditPicCtrl', ['$http','$scope','$rootScope','$location','EditUploadedPicService','$ionicLoading','$ionicScrollDelegate','$ionicPopup', function EditPicCtrl($http,$scope,$rootScope,$location,EditUploadedPicService,$ionicLoading,$ionicScrollDelegate,$ionicPopup) {
        $scope.loading = true;
        $scope.loadingWheel = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="circles"/>'
            });
        };
        $scope.loadingWheel();
        $scope.uploadPopup = function() {
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: 'Details Updated Successfully',
              okType: ' button-upload'
            });
            alertPopup.then(function(res) {
                $scope.fileUpload = "";
                $location.path('app/MyProfile');
            });
          };
          $scope.errorPopup = function() {
            $ionicPopup.alert({
              title: 'Error',
              template: 'You have to Capture picture',
              okType: ' button-upload' 
          });
          };
         function setTabClass() {
           angular.element(document.querySelector("#tabMyprofile")).removeClass("active");
         };
         setTabClass();
         $scope.check = function(tag)
         {
            console.log("inside check" , tag);
            if(tag.checked===false)
            {
                tag.checked = true;
            }
            else if(tag.checked=== true)
            {
                tag.checked = false;
            }
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
        var epc = this;
        
        console.log('on edit pic: imgid ',$rootScope.sessionImageID);
        epc.Post=[];
        epc.tagFinal=[];
        epc.tags=[];
        epc.newDes='';
        epc.tagsDB=[{name:"Hand Design",checked:false},{name: "Feet Design",checked:false},
            {name:"Indian",checked:false},{name:"Pakistani",checked:false},{name:"Moghlai",checked:false},
            {name:"Arabic",checked:false},
            {name:"Indo-Arabic",checked:false},{name:"Bridal",checked:false},{name:"Common",checked:false}];
        // epc.tags=[];
        epc.image = {
                        postID:$rootScope.sessionImageID
			//pID:'55191836535c2d3356a01e95'//$rootScope.sessionImageID															// begining of response set used for scroll down
			//userID:'55041c5ec20ec607edaf7729'												// tagName used for filtering the response on toggle click
		};
        epc.getPostDetail = function(){
            console.log('img details',epc.image)
            console.log('inside get post details...');
            
            
            EditUploadedPicService.getPostDetail(epc.image).then(function (response) {
                epc.Post = response.data;
                $scope.loading = false;
                $ionicLoading.hide();
                console.log('epc.post result:',epc.Post);
                console.log('epc.Post.tags:',epc.Post[0].tags);
                epc.tags = epc.Post[0].tags;
                console.log('epc.tags: inside getpostdetails',epc.tags);
                
                for(var i=0;i<epc.tagsDB.length;i++)
                {
                    for(var j=0;j<epc.tags.length;j++)
                    {

                        if(epc.tagsDB[i].name===epc.tags[j])
                            epc.tagsDB[i].checked=true;
                    }

                }
                 epc.newDes=epc.Post[0].description;
                 console.log('des:',epc.newDes);
                },
                function (error) {
                    console.log("Error in getPostDetail", error);
                 });
        
	};
        
	  console.log('epc.tags:',epc.tags);
    epc.submit=function()
    {
         $scope.loadingWheel();
         $ionicScrollDelegate.scrollTop();
        console.log("inside submit")
        var flag=false;
       // var tagFinal=[];
            for (var i = 0; i < epc.tagsDB.length; i++) {
                if(epc.tagsDB[i].checked)
                {
                    epc.tagFinal.push(epc.tagsDB[i].name);
                    if(epc.tagsDB[i].name==='Common')
                        flag=true;
                }
                
            }
            if(!flag){
                epc.tagFinal.push('Common');
            }
        
            epc.FinalChange=
                {tags:epc.tagFinal,
                 des:epc.newDes};   
             
//        console.log('new descriotion(inside submit): ',epc.newDes);
//                 console.log("final: ",epc.tagFinal);
//            console.log("data to be passed: ",epc.FinalChange);
//            $http.post('/',epc.FinalChange).success(function(response){
//                alert(response);
//                                });

    epc.updatePostDetail = function(){
		epc.PostDetails = {
                        postID:$rootScope.sessionImageID,
			description :epc.newDes ,
			tags : epc.tagFinal
		};
                console.log('update:',epc.PostDetails);
                EditUploadedPicService.updatePostDetail(epc.PostDetails).then(function (response) {
                    console.log(response.data);
                        if (response.data==="success") {
                            $scope.uploadPopup();
                            $scope.toggleGroup1(5);
                            $scope.loading = false;
                            $ionicLoading.hide();
                    }
                    
                },
                function (error) {
                    console.log("Error in updatePostDetail", error);
                 });
//		$http.post('http://api-ratemymehendi.rhcloud.com/editPic/update',epc.PostDetails).success(function(response){
//			console.log(response);
//                        if (response==='success') {
//                            $location.path('app/MyProfile');
//                    }
//                    
//		});	
	};
        
        epc.updatePostDetail();
    };
   
}]);