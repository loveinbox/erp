;
angular.module('erp.controllers')

.controller('FrameCtrl', function($scope) {
  $scope.navToggle = function(event) {
    var dom = $(event.target)
    if (dom.is('header') || dom.is('i')) {
      dom.closest('div')
        .find('i').toggleClass('rotate').end()
        .find('ul').toggle()
    }
  }

  $scope.bva = 123

})
