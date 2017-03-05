;
angular.module('erp.controllers')

.controller('FrameCtrl', function($scope, $state, $timeout, API, User) {
  $scope.navToggle = function(event) {
    var dom = $(event.target)
    if (dom.is('header') || dom.is('i')) {
      dom.closest('div')
        .find('i').toggleClass('rotate').end()
        .find('ul').toggle()
    }
  }

  $timeout(function() {
    $('.main-nav li').click(function() {
      $('.main-nav li').removeClass('active')
      $(this).addClass('active')
    })
  }, 1000)

  $scope.logout = function() {
    API['logout'].get({
      account: User.id
    }, function(data) {
      $state.go('login')
    });
  }

})
