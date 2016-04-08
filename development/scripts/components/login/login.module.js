angular.module('uProject.login', ['ngRoute', 'uProject', 'uProject.user'])

    .config(['$routeProvider', function ($routeProvider) {

      $routeProvider
          .when('/login', {
            templateUrl: 'components/login/login.view.html',
            controller: 'loginController',
            controllerAs: 'login'
          });
    }]);