angular.module('erp.services')

.service('Orders', function($resource, $state, API) {
  this.name = 'Orders'
  this.query = API.order
  this.export = API.orderExport
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.new', { type: 'order', id: rowData.shopId })
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        API.washRemove(rowData, function() {
          $state.go('app.lsit', { type: 'order' })
        })
      }
    }
  }
  this.filters = [{
    key: 'shopName',
    name: '订单分类',
  }, {
    key: 'shopName',
    name: '订单号',
  }, {
    key: 'shopName',
    name: '取货管家',
    type: 'typeahead',
    API: API.washShopName
  }, {
    key: 'shopName',
    name: '送回管家',
    type: 'typeahead',
    API: API.washShopName
  }, {
    key: 'orderTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'shopName',
    name: '注册手机号',
  }, {
    key: 'shopName',
    name: '商家名称',
  }, {
    key: 'shopName',
    name: '订单状态',
  }, {
    key: 'shopName',
    name: '商家名称',
    type: 'typeahead',
    API: API.washShopName
  }, {
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
      isHideInForm: true
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
      isHideInTable: true
    }, {
      text: '商家LOGO',
      apiName: 'shopImgsList',
      type: 'imgUpload',
      colSpan: true,
      isHideInTable: true
    }],
    actions: [{
      text: '改派取货',
      type: 'reFetch',
      key: 'fetchEguardId',
      directive: 'modal',
      getAPI: API.guardFetch,
      goAPI: API.reFetch,
    }, {
      text: '送回管家',
      type: 'reSend',
      key: 'sendEguardId',
      directive: 'modal',
      getAPI: API.guardSend,
      goAPI: API.reSend,
    }],
    button: {
      query: true,
      export: true
    }
  }

})

.service('OrderTime', function($resource, $state, API) {
  this.name = 'OrderTime'
  this.query = API.washShop
  this.export = API.washShopExport
  this.new = function() {
    $state.go('app.new', { type: 'washShop' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.new', { type: 'washShop', id: rowData.shopId })
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        API.washRemove(rowData, function() {
          $state.go('app.lsit', { type: 'washShop' })
        })
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
      isHideInForm: true
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
      isHideInTable: true
    }, {
      text: '商家LOGO',
      apiName: 'shopImgsList',
      type: 'imgUpload',
      colSpan: true,
      isHideInTable: true
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
      new: true,
      export: true
    }
  }

}).service('OrderGoods', function($resource, $state, API) {
  this.name = 'OrderGoods'
  this.query = API.washShop
  this.export = API.washShopExport
  this.new = function() {
    $state.go('app.new', { type: 'washShop' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.new', { type: 'washShop', id: rowData.shopId })
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        API.washRemove(rowData, function() {
          $state.go('app.lsit', { type: 'washShop' })
        })
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
      isHideInForm: true
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
      isHideInTable: true
    }, {
      text: '商家LOGO',
      apiName: 'shopImgsList',
      type: 'imgUpload',
      colSpan: true,
      isHideInTable: true
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
      new: true,
      export: true
    }
  }

})
