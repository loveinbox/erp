;
angular.module('erp.controllers')

.controller('LoginCtrl', function($scope, API) {
  $scope.user = {
    name: '',
    password: ''
  }
  $scope.action = {}

  $scope.action.login = function() {
    API['login']().get({}, function(data) {
      console.log(data);
    });
  }

})
