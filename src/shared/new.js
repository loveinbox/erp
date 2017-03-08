;
angular.module('erp.controllers')

.controller('addCtrl', function($scope, $timeout,
  $state, Upload, API, $stateParams,
  User, Fruit, Wash, Orders, OrderTime, OrderGoods,
  Guard, GuardOrder, FruitShop, WashShop, GuardWage,
  ShopWage, Banner) {
  const typeMap = {
    'user': User,
    'fruit': Fruit,
    'wash': Wash,
    'orders': Orders,
    'orderTime': OrderTime,
    'orderGoods': OrderGoods,
    'guard': Guard,
    'guardOrder': GuardOrder,
    'fruitShop': FruitShop,
    'washShop': WashShop,
    'guardWage': GuardWage,
    'shopWage': ShopWage,
    'banner': Banner,
  }
  let _switch = $scope.type = $stateParams.type
  let Entity = typeMap[_switch];
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
      productId: $stateParams.id,
      shopId: $stateParams.id
    }, function(data) {
      $scope.good = data.data
      $scope.forms.forEach((value) => {
        debugger
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
          default:
            value.value = $scope.good[value.formKey || value.apiName] || ''
        }
      })
    })
  } else {
    $scope.forms.forEach((value) => {
      if (value.type === 'select') {
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
      // if ($scope.forms[i].isHideInForm) {
      //   continue
      // }
      // if (!$scope.forms[i].value && !$scope.forms[i].productImgsList) {
      //   alert('所有字段必填')
      //   return
      // }
      if ($scope.forms[i].productImgsList) {
        //   let type1Max1 = 0,
        //     type3Max1 = 0;
        //   if ($scope.forms[i].productImgsList.length === 0) {
        //     alert('需要上传图片')
        //     return
        //   }
        //   $scope.forms[i].productImgsList.forEach((value) => {
        //     if (value.type === 1) type1Max1++;
        //     if (value.type === 3) type3Max1++;
        //   })
        //   if (type1Max1 > 1 || type3Max1 > 1) {
        //     alert('图标和主图都只能有一张');
        //     return
        //   }

        submitObject.productImgsList = $scope.forms[i].productImgsList
      }
      switch ($scope.forms[i].type) {
        case 'date':
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = moment($scope.forms[i].value).unix();
          break;
          // case 'typeahead':
          //   submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = $scope.forms[i].value.id
          //   break;
        case 'imgUpload':
          break;
        default:
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = $scope.forms[i].value
          break;
      }
    }
    submitObject.productId = $scope.good.productId
    let methodEOA = submitObject.productId ? method.edit : method.add
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
      form.productImgsList = form.productImgsList || []
      form.productImgsList.push({
        url: data.data[0]
      });
    });
  }
  $scope.removePic = function(pic, form) {
    form.productImgsList = form.productImgsList.filter(value => value !== pic)
  }

  function uploadFile(file) {
    return Upload.upload({
      url: 'http://www.lifeuxuan.com/index.php/mgr/image/upload',
      data: { file: file },
    });
  }

})

// formPool.fruit = [{
//     key: 'productName',
//     value: '',
//     name: '水果名称'
//   }, {
//     key: 'productDescription',
//     value: '',
//     name: '水果描述',
//   }, {
//     key: 'productPrice',
//     value: '',
//     name: '售价'
//   }, {
//     key: 'marketDate',
//     value: '',
//     name: '上架日期',
//     type: 'date'
//   }, {
//     key: 'productAvaliable',
//     value: '',
//     name: '库存'
//   }, {
//     key: 'productMeasure',
//     value: '',
//     name: '规格'
//   }, {
//     key: 'feeRate',
//     value: '',
//     name: '佣金率'
//   }, {
//     key: 'eguardProfitRate',
//     value: '',
//     name: '管家抽成'
//   }, {
//     key: 'shopId',
//     value: '',
//     name: '商家名称',
//     type: 'typeahead',
//     value: '',
//     API: API.fruitShopName
//   }, {
//     key: 'classifyId',
//     value: '',
//     name: '水果分类',
//     type: 'select',
//     value: '',
//     API: API.fruitClass
//   }, {
//     key: 'statusId',
//     value: '',
//     name: '状态',
//     type: 'select',
//     API: API.fruitFilterStatus
//   }, {
//     key: 'hotId',
//     value: '',
//     name: '是否爆品',
//     type: 'select',
//     API: API.fruitFilterHot
//   }, {
//     key: 'onSaleId',
//     value: '',
//     name: '是否热卖',
//     type: 'select',
//     API: API.fruitFilterSale
//   }]

//   formPool.wash = [{
//     key: 'productName',
//     value: '',
//     name: '衣服名称'
//   }, {
//     key: 'productUnitId',
//     value: '',
//     name: '洗衣单位',
//     type: 'select',
//     API: API.washUnit
//   }, {
//     key: 'marketDate',
//     value: '',
//     name: '上架日期',
//     type: 'date'
//   }, {
//     key: 'productPrice',
//     value: '',
//     name: '售价'
//   }, {
//     key: 'feeRate',
//     value: '',
//     name: '佣金率'
//   }, {
//     key: 'eguardProfitRate',
//     value: '',
//     name: '管家抽成'
//   }, {
//     key: 'shopId',
//     value: '',
//     name: '商家名称',
//     type: 'typeahead',
//     value: '',
//     API: API.washShopName
//   }, {
//     key: 'classifyId',
//     value: '',
//     name: '衣服分类',
//     type: 'select',
//     value: '',
//     API: API.washClass
//   }, {
//     key: 'statusId',
//     value: '',
//     name: '状态',
//     type: 'select',
//     API: API.washFilterStatus
//   }, {
//     key: 'hotId',
//     value: '',
//     name: '是否爆品',
//     type: 'select',
//     API: API.washFilterHot
//   }, {
//     key: 'onSaleId',
//     value: '',
//     name: '是否热卖',
//     type: 'select',
//     API: API.washFilterSale
//   }]

//   let methodPoll = {
//     wash: {
//       detail: API.washDetail,
//       edit: API.washEdit,
//       add: API.washAdd,
//       shopName: API.washShopName,
//     },
//     fruit: {
//       detail: API.fruitDetail,
//       edit: API.fruitEdit,
//       add: API.fruitAdd,
//       shopName: API.fruitShopName,
//     }
//   }
