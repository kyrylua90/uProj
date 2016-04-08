angular.module('uProject.login')
    .controller('loginController', ['$window', '$location', 'appStorage',
      function loginController($window, $location, appStorage) {
        var that = this;
        console.log(appStorage);
        this.onFormSubmit = function (e) {
          if (that.mail) {
            $location.path('/user');
            appStorage.saveData('currentUser', that.mail);
          }
          e.preventDefault();
        };
      }]);