angular.module('uProject.user')
    .factory('hashFactory', function () {
      return function generateHash(str) {
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

        return string.length !== 8 ? string.substr(0, hashLimit) : hash;
      };
    });