;
angular.module('erp.controllers')

.controller('classCtrl', function($scope, $stateParams, API) {
  let getMethod = null,
    addMethod = null,
    editMethod = null,
    removeMethod = null
  switch ($stateParams.type) {
    case 'fruit':
      getMethod = API.fruitClass;
      addMethod = API.fruitClassAdd;
      editMethod = API.fruitClassEdit;
      removeMethod = API.fruitClassRemove;
      break;
    case 'wash':
      getMethod = API.washClass;
      addMethod = API.washClassAdd;
      editMethod = API.washClassEdit;
      removeMethod = API.washClassRemove;
      break;
  }

  $scope.classes = []
  $scope.isEditing = false
  let editing = {},
    inputClass = {}

  getData()

  function getData() {
    getMethod.get({}, function(data) {
      $scope.classes = data.data
      $scope.inputClass.name = ''
      $scope.inputClass.pos = ''
    })
  }

  function findSelected(fruitClass) {
    let selected = fruitClass.filter(function(value) {
      return value.isSelected;
    })
    if (selected.length !== 1) {
      return false
    } else {
      return selected[0]
    }
  }
  $scope.newClass = function() {
    if (!$scope.inputClass.name && !$scope.inputClass.pos) {
      alert('请输入名称和位置');
      return
    }
    addMethod.save({
      name: $scope.inputClass.name,
      pos: $scope.inputClass.pos,
    }, function() {
      getData()
    })
  }
  $scope.preEditClass = function() {
    editing = Object.assign({}, findSelected($scope.classes))
    if (editing) {
      $scope.inputClass = editing
      $scope.isEditing = true
    } else {
      alert('选择有误')
    }
  }
  $scope.cancelEditClass = function() {
    $scope.isEditing = false
    $scope.inputClass.name = ''
    $scope.inputClass.pos = ''
  }
  $scope.editClass = function() {
    $scope.isEditing = false
    if (!$scope.inputClass.name && !$scope.inputClass.pos) {
      alert('请输入名称和位置');
      return
    }
    editing = findSelected($scope.classes)
    editMethod.get({
      id: editing.id,
      name: $scope.inputClass.name,
      pos: $scope.inputClass.pos,
    }, function() {
      getData()
    })
  }
  $scope.disableClass = function() {
    editing = findSelected($scope.classes)
    removeMethod.get({
      id: editing.id
    }, function() {
      getData()
    })
  }
})
