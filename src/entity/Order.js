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
  this.query = API.orderTime
  this.export = API.orderTimeExport
  this.new = function() {
    $state.go('app.new', { type: 'orderTime' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.new', { type: 'orderTime', id: rowData.shopId })
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        API.washRemove(rowData, function() {
          $state.go('app.lsit', { type: 'orderTime' })
        })
      }
    }
  }
  this.filters = [{
    key: 'shopName',
    name: '订单分类',
    type: 'select',
    options: [],
    API: API.shopStatus
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
    key: 'statusId',
    name: '状态',
    type: 'select',
    options: [],
    API: API.shopStatus
  }, {
    key: 'orderTime',
    name: '是否超时',
  }];
  this.meta = {
    header: [{
      text: '订单分类',
      apiName: 'shopId',
      isHideInForm: true
    }, {
      text: '订单号',
      apiName: 'shopName'
    }, {
      text: '订单状态',
      apiName: 'hostName'
    }, {
      text: '取回管家',
      apiName: 'shopPhoneNumber'
    }, {
      text: '送货管家',
      apiName: 'openTime',
    }, {
      text: '超时送达/取衣',
      apiName: 'shopAddress'
    }, {
      text: '下单时间',
      apiName: 'regionName',
      formKey: 'regionId',
      type: 'select',
      API: API.region
    }, {
      text: '预约时间',
      apiName: 'longitude',
      isHideInTable: true
    }, {
      text: '接单时间',
      apiName: 'latitude',
      isHideInTable: true
    }, {
      text: '取货/衣时间',
      apiName: 'hireTime',
      type: 'date'
    }, {
      text: '送达洗衣店时间',
      apiName: 'statusId',
      type: 'select',
      API: API.shopStatus
    }, {
      text: '开始清洗',
      apiName: 'deliveryFee'
    }, {
      text: '清洗完成时间',
      apiName: 'eguardDeliveryFeeRate'
    }, {
      text: '洗衣店取回时间',
      apiName: 'freeDeliveryMoney'
    }, {
      text: '送回完成时间',
      apiName: 'feeRate'
    }],
    button: {
      query: true,
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
    name: '订单分类',
    type: 'select',
    options: [],
    API: API.shopStatus
  }, {
    key: 'shopName',
    name: '订单号',
  }];
  this.meta = {
    header: [{
      text: '订单分类',
      apiName: 'shopId',
      isHideInForm: true
    }, {
      text: '订单号',
      apiName: 'shopName'
    }, {
      text: '收货人',
      apiName: 'hostName'
    }, {
      text: '取回管家',
      apiName: 'shopPhoneNumber'
    }, {
      text: '送货管家',
      apiName: 'openTime',
    }, {
      text: '商家',
      apiName: 'shopAddress'
    }, {
      text: '订单明细',
      apiName: 'regionName',
      formKey: 'regionId',
      type: 'select',
      API: API.region
    }],
    button: {
      query: true,
      export: true
    }
  }

})
