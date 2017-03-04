;
angular.module('erp.controllers')

.controller('addWashCtrl', function($scope, $timeout, $http, API) {
  $scope.good = {
    'productName': '', // 衣服名称
    'productUnitId': '', // 洗衣单位
    'marketDate': '', // 上架日期
    'productPrice': '', // 售价
    'feeRate': '', // 佣金率
    'eguardProfitRate': '', // 管家抽成
    'shopId': '', // 商家ID
    'classifyId': '', // 产品分类ID
    'statusId': '', // 状态ID
    'hotId': '', // 是否爆品 1001->是，1002->否
    'onSaleId': '', // 是否热卖 1001->是，1002->否
  }

  $scope.forms = [{
    key: 'productName',
    value: '',
    name: '衣服名称'
  }, {
    key: 'productUnitId',
    value: '',
    name: '洗衣单位',
    type: 'select',
    API: API.washFilterClass
  }, {
    key: 'marketDate',
    value: '',
    name: '上架日期',
    type: 'date'
  }, {
    key: 'productPrice',
    value: '',
    name: '售价'
  }, {
    key: 'feeRate',
    value: '',
    name: '佣金率'
  }, {
    key: 'eguardProfitRate',
    value: '',
    name: '管家抽成'
  }, {
    key: 'shopId',
    value: '',
    name: '商家名称',
    type: 'ahead',
    value: '',
    API: API.washFilterClass
  }, {
    key: 'classifyId',
    value: '',
    name: '衣服分类',
    type: 'ahead',
    value: '',
    API: API.washFilterClass
  }, {
    key: 'statusId',
    value: '',
    name: '状态',
    type: 'select',
    API: API.washFilterStatus
  }, {
    key: 'hotId',
    value: '',
    name: '是否爆品',
    type: 'select',
    API: API.washFilterHot
  }, {
    key: 'onSaleId',
    value: '',
    name: '是否热卖',
    type: 'select',
    API: API.washFilterSale
  }]

  $scope.forms.forEach((value) => {
    if (value.type === 'select') {
      value.API.get({}, function(data) {
        value.options = data.data
      })
    }
  })

  $scope.typeaheadOptions = []
  $scope.formatLabel = function(model) {
    for (var i = 0; i < $scope.typeaheadOptions.length; i++) {
      if (model === $scope.typeaheadOptions[i].id) {
        return $scope.typeaheadOptions[i].name;
      }
    }
  };
  $scope.getLocation = function(val) {
    return API.washFilterClass.get({}).$promise.then(function(data) {
      $scope.typeaheadOptions = data.data
      return data.data
    })
  };
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
