(function () {
    var weatherApp = angular.module("weatherApp");
    var DetailPageController = function ($scope,$location,$rootScope,$http) {
        $scope.cityName = null;
        $scope.reportList = null;
        $scope.appId = '20078b1e70a2b8384de4724bc69e5c86';

        $scope.reqObj = JSON.parse(localStorage.getItem('requestObject'));
        $scope.isSingleDayReport = $scope.reqObj.isSingleDayReport;
        $scope.date = $scope.reqObj.date;
        
    	$scope.onload = function () {
    		if($scope.reqObj.isSingleDayReport){
    			$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?id="+$scope.reqObj.city+"&cnt=16&appid="+$scope.appId+"&units=metric")
        	    .then(function(response) {
        	    	$scope.cityName = response.data.city.name;
        	    	$scope.reportList = response.data.list;
        	    });
    		}
    		else{
    			$http.get("http://api.openweathermap.org/data/2.5/forecast?id="+$scope.reqObj.city+"&appid="+$scope.appId+"&units=metric")
        	    .then(function(response) {
        	    	$scope.cityName = response.data.city.name;
        	    	$scope.reportList = response.data.list;
        	    	
        	    	$scope.names_array_new = $scope.reportList.reduceRight(function (r, a) {
        	    	    r.some(function (b) { return $scope.getDisplayDate(a.dt) === $scope.getDisplayDate(b.dt); }) || r.push(a);
        	    	    return r;
        	    	}, []);
        	    	
        	    	$scope.reportList = $scope.names_array_new.reverse();
        	    });
    		}
    	}
    	
    	$scope.getDisplayDate = function(dt){
    		var date = new Date(dt*1000);
    		var displayDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    		return displayDate;
    	}
    	
    	$scope.filterExpression = function(date) {
		  return ($scope.getDisplayDate(date.dt) === $scope.date);
		}
    	
    	$scope.goHome = function(){
        	$location.path('/HomePage');
        }
	
    	$scope.onload();
    };
    
    weatherApp.controller('DetailPageController',
            ['$scope','$location','$rootScope','$http', DetailPageController]);
})();