;
angular.module('erp.controllers')

.controller('addWashCtrl', function($scope) {
  $scope.good = {}
})

.controller('classWashCtrl', function($scope) {
  function findSelected(fruitClass) {
    let selected = fruitClass.filter(function(value) {
      return value.isSelected;
    })
    if (selected.length !== 1) {
      return false
    } else {
      return selected
    }
  }
  $scope.newClass = function() {
    $scope.fruit.class.push({
      value: $scope.fruit.newClass,
      isSelected: false
    })
    $scope.fruit.newClass = ''
  }
  $scope.editClass = function() {
    let selected = findSelected($scope.fruit.class)
    if (!selected) {
      alert('选择项目的数目有误！');
      return
    } else {
      123;
    }
  }
  $scope.disableClass = function() {
    let selected = findSelected($scope.fruit.class)
    selected.forEach(function(value) {
      123;
    })
  }
  $scope.fruit = {
    class: [{
      value: 1,
      isSelected: false
    }, {
      value: 2,
      isSelected: false
    }, {
      value: 3,
      isSelected: false
    }, {
      value: 3,
      isSelected: false
    }, {
      value: 3,
      isSelected: false
    }, {
      value: 4,
      isSelected: false
    }]
  }
})
