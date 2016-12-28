(function () {
    var weatherApp = angular.module("weatherApp");
    weatherApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                    when('/HomePage', {
                        templateUrl: 'views/Pages/HomePage.html',
                        controller: 'HomePageController'
                    }).
                    when('/DetailPage', {
                        templateUrl: 'views/Pages/DetailPage.html',
                        controller: 'DetailPageController'
                    }).
                    otherwise({
                        redirectTo: '/HomePage'
                    });
        }]);
})();