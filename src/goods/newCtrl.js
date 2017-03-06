;
angular.module('erp.controllers')

.controller('addCtrl', function($scope, $timeout, $state, $http, Upload, API, $stateParams) {
  let _switch = $scope.type = $stateParams.type
  $scope.good = {
    // 'productName': '', // 衣服名称
    // 'productUnitId': '', // 洗衣单位
    // 'marketDate': '', // 上架日期
    // 'productPrice': '', // 售价
    // 'feeRate': '', // 佣金率
    // 'eguardProfitRate': '', // 管家抽成
    // 'shopId': '', // 商家ID
    // 'classifyId': '', // 产品分类ID
    // 'statusId': '', // 状态ID
    // 'hotId': '', // 是否爆品 1001->是，1002->否
    // 'onSaleId': '', // 是否热卖 1001->是，1002->否
    // 'productImgsList': []
  }

  let formPool = {}

  formPool.wash = [{
    key: 'productName',
    value: '',
    name: '衣服名称'
  }, {
    key: 'productUnitId',
    value: '',
    name: '洗衣单位',
    type: 'select',
    API: API.washUnit
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
    type: 'typeahead',
    value: '',
    API: API.washShopName
  }, {
    key: 'classifyId',
    value: '',
    name: '衣服分类',
    type: 'select',
    value: '',
    API: API.washClass
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

  let methodPoll = {
    wash: {
      detail: API.washDetail,
      edit: API.washEdit,
      add: API.washAdd,
      shopName: API.washShopName,
    },
    fruit: {
      detail: API.fruitDetail,
      edit: API.fruitEdit,
      add: API.fruitAdd,
      shopName: API.fruitShopName,
    }
  }

  $scope.goBack = function() {
    $state.go('app.list', { type: _switch })
  }

  $scope.forms = formPool[
    _switch];

  let method = methodPoll[
    _switch]

  if ($stateParams.id) {
    // API.washDetail.get({
    method.detail.get({
      productId: $stateParams.id
    }, function(data) {
      $scope.good = data.data
      $scope.forms.forEach((value) => {
        switch (value.type) {
          case 'date':
            value.value = new Date($scope.good[value.key] * 1000);
            break;
          case 'select':
            value.value = $scope.good[value.key] + ''
            value.API.get({}, function(data) {
              value.options = data.data
            })
            break;
          case 'typeahead':
            value.value = {
              id: $scope.good.shopId,
              name: $scope.good.shopName
            }
            break;
          default:
            value.value = $scope.good[value.key] + ''
        }
      })
    })
  }

  $scope.typeaheadOptions = []
  $scope.formatLabel = function(model) {
    if (typeof model === 'object') {
      return model.name
    }
    for (var i = 0; i < $scope.typeaheadOptions.length; i++) {
      if (model === $scope.typeaheadOptions[i].id) {
        return $scope.typeaheadOptions[i].name;
      }
    }
  };
  $scope.getOptions = function(searchVal) {
    // return API.washShopName.get({ name: searchVal }).$promise.then(function(data) {
    return method.shopName.get({ name: searchVal }).$promise.then(function(data) {
      $scope.typeaheadOptions = data.data
      return data.data
    })
  };
  $scope.submit = function() {
    let submitObject = {}
    for (var i = $scope.forms.length - 1; i >= 0; i--) {
      if (!$scope.forms[i].value) {
        alert('所有字段必填')
        return
      }
      switch ($scope.forms[i].type) {
        case 'date':
          submitObject[$scope.forms[i].key] = moment($scope.forms[i].value).unix();
          break;
        case 'typeahead':
          submitObject[$scope.forms[i].key] = $scope.forms[i].value.id
          break;
        default:
          submitObject[$scope.forms[i].key] = $scope.forms[i].value
          break;
      }
    }
    submitObject.productImgsList = $scope.good.productImgsList
    submitObject.productId = $scope.good.productId
      // let methodEOA = submitObject.productId ? API.washEdit : API.washAdd
    let methodEOA = submitObject.productId ? method.edit : method.add
    methodEOA.save(submitObject, function(data) {
      if (data.code === 0) {
        alert('操作成功！')
      }
    })
  }

  $scope.uploadFile = function(file) {
    if (!file) return;
    uploadFile(file).success(function(data) {
      $scope.good.productImgsList.push({
        url: data.data[0]
      });
    });
  }
  $scope.removePic = function(pic) {
    let index = pic.indexOf($scope.good.productImgsList)
    $scope.good.productImgsList.splice(index, 1)
  }

  function uploadFile(file) {
    return Upload.upload({
      url: 'http://www.lifeuxuan.com/index.php/mgr/image/upload',
      data: { file: file },
    });
  }

})
