(function () {
    var weatherApp = angular.module("weatherApp");
    
    var HomePageController = function ($scope,$location,$rootScope,$http) {
    	
    	$scope.citySelector = "Bangalore";
    	$scope.datePicker = null;
    	$scope.formattedDate = null;
    	$scope.requestObject = {};
    	$scope.ErrorMessage = ""
    	$scope.isError = false;
    	
    	$scope.cities = null;
    	$scope.cityDropdownList = [];
    	
    	$scope.onload = function (){
    		$http.get("src/json/cities.json")
    	    .then(function(response) {
    	    	$scope.cities = JSON.parse(response.data.substring(7,response.data.length));
    	    	for (var key in $scope.cities) {
    	    		$scope.cityDropdownList.push(key);
    	    	}
    	    });
    	},
    	
    	$scope.showWeather = function(){
    		if($scope.datePicker){
    			if($scope.datePicker < new Date().setHours(0,0,0,0)){
    				$scope.error("Error:Please choose a future date");
    			}
    			else if($scope.datePicker.getTime() > (new Date().getTime()+(24*60*60*16*1000))){
    				$scope.error("Error:Choose a date not later than 16 days from current date.");
    			}
    			else
				{
    				$scope.isError = false;
					$scope.formattedDate = $scope.datePicker.getDate()+"-"+($scope.datePicker.getMonth()+1)+"-"+$scope.datePicker.getFullYear();
	    			$scope.requestObject = {'isSingleDayReport':true,'city':$scope.cities[$scope.citySelector],'date':$scope.formattedDate};
	        		localStorage.setItem('requestObject',JSON.stringify($scope.requestObject));
	    			$scope.gotoDetailPage();
				}
    		}
    		else{
    	    	$scope.error("Error:Please choose a date");
    		}
        },
    	
    	$scope.forecast = function(){
        	$scope.requestObject = {'isSingleDayReport':false,'city':$scope.cities[$scope.citySelector]};
        	localStorage.setItem('requestObject',JSON.stringify($scope.requestObject));
        	$scope.gotoDetailPage();
    	},
    	
    	$scope.gotoDetailPage = function(){
        	$location.path('/DetailPage');
        }
    	
    	$scope.error = function(message){
    		$scope.ErrorMessage = message;
    		$scope.isError = true;
    	}
    	
    	$scope.onload();
    };

    weatherApp.controller('HomePageController',
            ['$scope','$location','$rootScope','$http', HomePageController]);
})();