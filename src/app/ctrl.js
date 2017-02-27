;
angular.module('erp.controllers')

.controller('FrameCtrl', function($scope, $state, API, User) {
  $scope.navToggle = function(event) {
    var dom = $(event.target)
    if (dom.is('header') || dom.is('i')) {
      dom.closest('div')
        .find('i').toggleClass('rotate').end()
        .find('ul').toggle()
    }
  }

  $scope.logout = function() {
    API['logout'].get({
      account: User.id
    }, function(data) {
      $state.go('login')
    });
  }

})
