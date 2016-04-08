angular.module('uProject.user')
    .controller('userController', ['appStorage', '$location', 'hashFactory',
      function userController(appStorage, $location, hashFactory) {
        var currentUser = appStorage.getData('currentUser');

        this.list = [];

        this.addField = function () {
          this.list.push({
            hash: hashFactory(this.text),
            input: this.text,
            mail: currentUser,
            date: (new Date()).toDateString()
          });

          this.text = '';
          showMessage();
        };

        this.logout = function () {
          appStorage.saveData('currentUser', '');
          $location.path('/login');
        };

        // TODO: it's really bad part. Need to move to directive
        function showMessage() {
          jQuery('.message').fadeIn(400).delay(1000).fadeOut(400);
        }

      }]);