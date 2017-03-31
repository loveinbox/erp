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
    'banner': { Entity: Banner, mainId: 'bannerId' },
  }
  let _switch = $scope.type = $stateParams.type
  let Entity = typeMap[_switch].Entity
  let mainId = typeMap[_switch].mainId
  if (!Entity) {
    console.error('[MY ERROR]No Entity!')
    $state.go('login')
  }

  $scope.forms = Entity.meta.header.map(a => {
    if (typeof a === 'object') {
      return Object.assign({}, a)
    } else {
      return a
    }
  });
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

  $scope.submitText = '新建'

  if ($stateParams.id) {
    $scope.submitText = '修改'
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
          case 'imgUpload':
            value.imgList = $scope.good[value.formKey || value.apiName]
            break;
          case 'imgUploadSingle':
            value.imgList = [{ url: $scope.good.headImg }]
            break;
          case 'dateRange':
            value.value = $scope.good[value.formKey] + ''
            value.value2 = $scope.good[value.formKey2] + ''
            value.API.get({}, function(data) {
              value.options = data.data
            })
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
    return method.shopName.get({ shopName: searchVal })
      .$promise.then(function(data) {
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
      if (!$scope.forms[i].value && !$scope.forms[i].imgList && !$scope.forms[i].noValidate) {
        alert('所有字段必填')
        return
      }
      if ($scope.forms[i].imgList && $scope.forms[i].imgList.length < 1) {
        alert('需要上传图片')
        return
      }
      if ($scope.forms[i].isNeedValidation) {
        let type1 = 0,
          type2 = 0,
          type3 = 0;
        $scope.forms[i].imgList.forEach((value) => {
          if (value.type === 1) type1++;
          if (value.type === 0) type2++;
          if (value.type === 3) type3++;
        })
        if (type1 !== 1) {
          alert('必须有一张图标');
          return
        }
        if (type3 !== 1) {
          alert('必须有一张主图');
          return
        }
        if (type2 < 1) {
          alert('至少有一张详情图');
          return
        }
      }
      switch ($scope.forms[i].type) {
        case 'date':
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = moment($scope.forms[i].value)
            .unix();
          break;
        case 'typeahead':
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = $scope.forms[i].value.id || $scope.forms[i].value
          if ($scope.forms[i].formKey && $scope.forms[i].value && !$scope.forms[i].value.id) {
            alert('模糊查询字段需要进行选择')
            return
          }
          break;
        case 'imgUpload':
          let tempImgList = $scope.forms[i].imgList.slice()
          if ($scope.forms[i].isRadioBoxSeprated === undefined) {
            let isFindSelected = false
            tempImgList.forEach(value => {
              if ($scope.forms[i].picSelected === value.url) {
                value.type = 1
                isFindSelected = true
              } else {
                value.type = 0
              }
            })
            if (!isFindSelected) {
              alert('需要选择一张图片')
              return
            }
          }
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = tempImgList
          break;
        case 'imgUploadSingle':
          submitObject[$scope.forms[i].formKey || $scope.forms[i].apiName] = $scope.forms[i].imgList[0].url
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
    let methodEOA = submitObject[mainId] ? method.edit : method.add
    methodEOA.save(submitObject, function(data) {
      if (data.code === 0) {
        for (var i = $scope.forms.length - 1; i >= 0; i--) {
          if ($scope.forms[i].isClear) {
            $scope.forms[i].value = '';
            if ($scope.forms[i].imgList) {
              $scope.forms[i].imgList = []
            }
          }
        }
        alert($scope.submitText + '成功！')
        if (submitObject[mainId]) {
          $state.go('app.list', { type: _switch })
        }
      }
    })
  }

  $scope.radioInit = function(form, pic, index) {
    if (pic.type === 1) {
      form.picSelected = pic.url
    }
  }

  $scope.uploadFile = function(file, form) {
    if (!file) return;
    uploadFile(file)
      .success(function(data) {
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
