;
angular.module('erp.controllers')

.controller('LoginCtrl', function($scope, $state, API, User) {
  $scope.user = {
    name: '',
    password: ''
  }
  $scope.action = {}

  $scope.action.login = function() {
    if (!$scope.user.name || !$scope.user.password) {
      alert('用户名/密码不能为空')
      return;
    }
    API['login'].get({
      account: $scope.user.name,
      password: $scope.user.password
    }, function(data) {
      User.id = $scope.user.name
      $state.go('app.orders')
    });
  }

})
