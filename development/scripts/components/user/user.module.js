(function(){
    "use strict";

    angular.module('uProject.user',['ngRoute', 'uProject'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider
                .when('/user', {
                    title: 'uProject user',
                    templateUrl: 'components/user/user.view.html',
                    controller: 'userController',
                    controllerAs: 'user'
                });
        }]);
})();