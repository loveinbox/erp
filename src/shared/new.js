;
angular.module('erp.controllers')

.controller('addCtrl', function($scope, $timeout,
  $state, Upload, API, $stateParams,
  User, Fruit, Wash, Orders, OrderTime, OrderGoods,
  Guard, GuardOrders, FruitShop, WashShop, GuardWage,
  ShopWage, Banner) {
  const typeMap = {
    'user': { Entity: User, mainId: 'userId' },
    'fruit': { Entity: Fruit, mainId: 'productId' },
    'wash': { Entity: Wash, mainId: 'productId' },
    'orders': { Entity: Orders, mainId: '' },
    'orderTime': { Entity: OrderTime, mainId: '' },
    'orderGoods': { Entity: OrderGoods, mainId: '' },
    'guard': { Entity: Guard, mainId: 'eguardId' },
    'guardOrder': { Entity: GuardOrders, mainId: '' },
    'fruitShop': { Entity: FruitShop, mainId: 'shopId' },
    'washShop': { Entity: WashShop, mainId: 'shopId' },
    'guardWage': { Entity: GuardWage, mainId: '' },
    'shopWage': { Entity: ShopWage, mainId: '' },
    'banner': { Entity: Banner, mainId: '' },
  }
  let _switch = $scope.type = $stateParams.type
  let Entity = typeMap[_switch].Entity
  let mainId = typeMap[_switch].mainId
  if (!Entity) {
    console.error('[MY ERROR]No Entity!')
    $state.go('login')
  }

  $scope.forms = Entity.meta.header
  $scope.good = {}
  $scope.goBack = function() {
    $state.go('app.list', { type: _switch })
  }
  let method = {
    detail: API[_switch + 'Detail'],
    edit: API[_switch + 'Edit'],
    add: API[_switch + 'Add'],
    shopName: API[_switch + 'ShopName'],
  }



  if ($stateParams.id) {
    method.detail.get({
      [mainId]: $stateParams.id
    }, function(data) {
      $scope.good = data.data
      $scope.forms.forEach((value) => {
        switch (value.type) {
          case 'date':
            value.value = new Date($scope.good[value.formKey || value.apiName] * 1000);
            break;
          case 'select':
            value.value = $scope.good[value.formKey || value.apiName] + ''
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
          case 'dateRange':
            value.value = $scope.good[value.formKey] + ''
            value.value2 = $scope.good[value.formKey2] + ''
            value.API.get({}, function(data) {
              value.options = data.data
            })
            break;
          case 'imgUpload':
            value.imgList = $scope.good[value.apiName || value.formKey]
            break
          default:
            value.value = $scope.good[value.formKey || value.apiName] || ''
        }
      })
    })
  } else {
    $scope.forms.forEach((value) => {
      if (value.type === 'select' || value.type === 'dateRange') {
        value.API.get({}, function(data) {
          value.options = data.data
        })
      }
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
    return method.shopName.get({ shopName: searchVal }).$promise.then(function(data) {
      $scope.typeaheadOptions = data.data
      return data.data
    })
  };
  $scope.submit = function() {
    let submitObject = {}
    for (var i = $scope.forms.length - 1; i >= 0; i--) {
      if ($scope.forms[i].isHideInForm) {
        continue
      }
      if (!$scope.forms[i].value && !$scope.forms[i].imgList) {
        alert('所有字段必填')
        return
      }
      if ($scope.forms[i].imgsList) {
        let type1Max1 = 0,
          type3Max1 = 0;
        if ($scope.forms[i].imgsList.length === 0) {
          alert('需要上传图片')
          return
        }
        $scope.forms[i].imgsList.forEach((value) => {
          if (value.type === 1) type1Max1++;
          if (value.type === 3) type3Max1++;
        })
        if (type1Max1 > 1 || type3Max1 > 1) {
          alert('图标和主图都只能有一张');
          return
        }
      }
      switch ($scope.forms[i].type) {
        case 'date':
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = moment($scope.forms[i].value).unix();
          break;
          // case 'typeahead':
          //   submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = $scope.forms[i].value.id
          //   break;
        case 'imgUpload':
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = $scope.forms[i].imgList
          break;
        case 'dateRange':
          submitObject[$scope.forms[i].formKey] = $scope.forms[i].value
          submitObject[$scope.forms[i].formKey2] = $scope.forms[i].value2
        default:
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = $scope.forms[i].value
      }
    }
    if (mainId) {
      submitObject[mainId] = $stateParams.id
    }
    let methodEOA = mainId ? method.edit : method.add
    methodEOA.save(submitObject, function(data) {
      if (data.code === 0) {
        alert('操作成功！')
        $state.go('app.list', { type: _switch })
      }
    })
  }

  $scope.uploadFile = function(file, form) {
    if (!file) return;
    uploadFile(file).success(function(data) {
      form.imgList = form.imgList || []
      form.imgList.push({
        url: data.data[0]
      });
    });
  }
  $scope.removeItem = function(item, form, formPart, listPart) {
    let list = form[formPart]
    let temp = []
    list.forEach((value) => {
      if (value[listPart] !== item[listPart]) {
        temp.push(value)
      }
    })
    form[formPart] = temp
  }

  function uploadFile(file) {
    return Upload.upload({
      url: 'http://www.lifeuxuan.com/index.php/mgr/image/upload',
      data: { file: file },
    });
  }
})
