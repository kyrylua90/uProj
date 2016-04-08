angular.module('uProject', ['ngRoute', 'uProject.login'])

    .run(['$rootScope', '$window', 'appStorage', function ($rootScope, $window, appStorage) {

      $rootScope.$on("$locationChangeStart", function (event, next) {
        if (!appStorage.getData('currentUser')) {
          if ($window.location.pathname !== '/login') {
            $window.location.assign('/login');
          }
        } else {
          if ($window.location.pathname !== '/user') {
            $window.location.assign('/user');
          }
        }
      });

    }])

    .config(['$locationProvider', function ($locationProvider) {
      $locationProvider.html5Mode(true);
    }])

  .factory('appStorage', function () {
    var ls = localStorage,
        appStorage = ls.uProject ? JSON.parse(ls.uProject) : {};

    function saveData(name, data) {
      appStorage[name] = data;
      ls.uProject = JSON.stringify(appStorage);
    }

    function getData(name) {
      return appStorage[name];
    }

    return {
      saveData: saveData,
      getData: getData
    };
  });