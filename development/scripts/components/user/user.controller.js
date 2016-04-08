angular.module('uProject.user')
    .controller('userController', ['appStorage', '$location', function userController(appStorage, $location) {
      var currentUser = appStorage.getData('currentUser');
      
      this.list = [];

      function generateHash(str) {
        var hash = 1,
            index = str.length - 1,
            hashLimit = 8,
            string;

        if (!str) {
          return 0;
        }

        while (hash.toString().length < hashLimit) {
          hash *= str.charCodeAt(index);
          index = !index ? str.length - 1 : index--;
        }

        string = hash.toString();

        return string.length !== 8 ? +string.substr(0, hashLimit) : hash;
      }
      
      this.addField = function () {
        this.list.push({
          hash: generateHash(this.text),
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