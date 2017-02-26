;
angular.module('erp.controllers')

.controller('GoodsFruitCtrl', function($scope) {
  $scope.data = {
    filters: [{
      name: 'test',
      type: 'text'
    }, {
      name: 'test2',
      type: 'text'
    }],
    filtersValue: {
      'test': '123',
      'test2': '456'
    }
  }
})
