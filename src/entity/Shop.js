angular.module('erp.services')

.service('FruitShop', function($resource, $state, API) {
  this.name = 'FruitShop'
  this.query = API.fruitShop
  this.export = API.fruitShopExport
  this.new = function() {
    $state.go('app.new', { type: 'fruitShop' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      var url = $state.href('app.new', { type: 'fruitShop', id: rowData.shopId });
      window.open(url, '_blank');
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        return API.fruitShopRemove.get(rowData).$promise
      }
    }
  }
  this.filters = [{
    key: 'shopName',
    name: '商家名称',
    type: 'typeahead',
    API: API.fruitShopName
  }, {
    key: 'statusId',
    name: '状态',
    type: 'select',
    options: [],
    API: API.shopStatus
  }];
  this.meta = {
    header: [{
      text: '商家编号',
      apiName: 'shopId',
      isHideInForm: true
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '合同号',
      apiName: 'contractId',
    }, {
      text: '店主姓名',
      apiName: 'hostName'
    }, {
      text: '商家电话',
      apiName: 'shopPhoneNumber'
    }, {
      text: '营业时间',
      apiName: 'openTime',
      formKey: 'openTimeId',
      formKey2: 'closeTimeId',
      type: 'dateRange',
      API: API.timeUnit
    }, {
      text: '商家地址',
      apiName: 'shopAddress',
    }, {
      text: '区域',
      apiName: 'regionName',
      formKey: 'regionId',
      type: 'select',
      API: API.region
    }, {
      text: '经度',
      apiName: 'longitude',
      isHideInTable: true
    }, {
      text: '纬度',
      apiName: 'latitude',
      isHideInTable: true
    }, {
      text: '合作时间',
      apiName: 'hireTime',
      type: 'date'
    }, {
      text: '状态',
      apiName: 'statusName',
      formKey: 'statusId',
      type: 'select',
      API: API.shopStatus
    }, {
      text: '配送费',
      apiName: 'deliveryFee'
    }, {
      text: '管家抽成',
      apiName: 'eguardDeliveryFeeRate'
    }, {
      text: '起送金额',
      apiName: 'startDeliveryMoney'
    }, {
      text: '佣金率',
      apiName: 'feeRate'
    }, {
      text: '累计单量',
      apiName: 'totalSaleVolume',
      isHideInForm: true
    }, {
      text: '平均月单量',
      apiName: 'avgMonthSaleVolume',
      isHideInForm: true
    }, {
      text: '账号',
      apiName: 'account',
      isHideInTable: true
    }, {
      text: '密码',
      apiName: 'password',
      isHideInTable: true
    }, {
      text: '绑定微信',
      apiName: 'employeesList',
      type: 'list',
      colSpan: true,
      noValidate: true,
      isHideInTable: true
    }, {
      text: '商家LOGO',
      apiName: 'shopImgsList',
      type: 'imgUpload',
      colSpan: true,
      isHideInTable: true,
      boxKey: 'isUsed',
      boxes: [{
        value: 1,
        text: 'LOGO'
      }]
    }],
    actions: [{
      text: '修改',
      type: 'edit'
    }, {
      text: '废弃',
      type: 'disable'
    }],
    button: {
      query: true,
      export: true
    }
  }

})

.service('WashShop', function($resource, $state, API) {
  this.name = 'WashShop'
  this.query = API.washShop
  this.export = API.washShopExport
  this.new = function() {
    $state.go('app.new', { type: 'washShop' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      var url = $state.href('app.new', { type: 'washShop', id: rowData.shopId });
      window.open(url, '_blank');
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        return API.washShopRemove.get(rowData).$promise
      }
    }
  }
  this.filters = [{
    key: 'shopName',
    name: '商家名称',
    type: 'typeahead',
    API: API.washShopName
  }, {
    key: 'statusId',
    name: '状态',
    type: 'select',
    options: [],
    API: API.shopStatus
  }];
  this.meta = {
    header: [{
      text: '商家编号',
      apiName: 'shopId',
      isHideInForm: true
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '合同号',
      apiName: 'contractId',
    }, {
      text: '店主姓名',
      apiName: 'hostName'
    }, {
      text: '商家电话',
      apiName: 'shopPhoneNumber'
    }, {
      text: '营业时间',
      apiName: 'openTime',
      formKey: 'openTimeId',
      formKey2: 'closeTimeId',
      type: 'dateRange',
      API: API.timeUnit
    }, {
      text: '商家地址',
      apiName: 'shopAddress'
    }, {
      text: '区域',
      apiName: 'regionName',
      formKey: 'regionId',
      type: 'select',
      API: API.region
    }, {
      text: '经度',
      apiName: 'longitude',
      isHideInTable: true
    }, {
      text: '纬度',
      apiName: 'latitude',
      isHideInTable: true
    }, {
      text: '合作时间',
      apiName: 'hireTime',
      type: 'date'
    }, {
      text: '状态',
      apiName: 'statusId',
      type: 'select',
      API: API.shopStatus
    }, {
      text: '配送费',
      apiName: 'deliveryFee'
    }, {
      text: '管家抽成',
      apiName: 'eguardDeliveryFeeRate'
    }, {
      text: '免配送费金额',
      apiName: 'freeDeliveryMoney'
    }, {
      text: '佣金率',
      apiName: 'feeRate'
    }, {
      text: '累计单量',
      apiName: 'totalSaleVolume',
      isHideInForm: true
    }, {
      text: '平均月单量',
      apiName: 'avgMonthSaleVolume',
      isHideInForm: true
    }, {
      text: '账号',
      apiName: 'account',
      isHideInTable: true
    }, {
      text: '密码',
      apiName: 'password',
      isHideInTable: true
    }, {
      text: '绑定微信',
      apiName: 'employeesList',
      type: 'list',
      colSpan: true,
      isHideInTable: true,
      noValidate: true,
    }, {
      text: '商家LOGO',
      apiName: 'shopImgsList',
      type: 'imgUpload',
      colSpan: true,
      isHideInTable: true,
      boxKey: 'isUsed',
      boxes: [{
        value: 1,
        text: 'LOGO'
      }]
    }],
    actions: [{
      text: '修改',
      type: 'edit'
    }, {
      text: '废弃',
      type: 'disable'
    }],
    button: {
      query: true,
      export: true
    }
  }

})
