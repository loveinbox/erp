angular.module('erp.services')

.service('FruitShop', function($resource, API) {
  this.name = 'FruitShop'
  this.query = API.fruitShop
  this.export = API.fruitShopExport
  this.new = function() {
    $state.go('app.shop-new', { type: 'fruitShop' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.shop-new', { type: 'fruitShop', id: rowData.shopId })
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        API.fruitRemove(rowData, function() {
          $state.go('app.lsit', { type: 'fruitShop' })
        })
      }
    }
  }
  this.filters = [{
    key: 'shopName',
    value: '',
    name: '商家名称',
    type: 'typeahead',
    API: API.fruitShopName
  }, {
    key: 'statusId',
    value: '',
    name: '状态',
    type: 'select',
    options: [],
    API: API.shopStatus
  }];
  this.meta = {
    header: [{
      text: '商家编号',
      apiName: 'shopId'
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '合同号',
      apiName: 'contractId'
    }, {
      text: '店主姓名',
      apiName: 'hostName'
    }, {
      text: '商家电话',
      apiName: 'shopPhoneNumber'
    }, {
      text: '营业时间',
      apiName: 'openTime'
    }, {
      text: '商家地址',
      apiName: 'shopAddress'
    }, {
      text: '合作时间',
      apiName: 'hireTime'
    }, {
      text: '区域',
      apiName: 'regionName'
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
      apiName: 'totalSaleVolume'
    }, {
      text: '平均月单量',
      apiName: 'avgMonthSaleVolume'
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

.service('WashShop', function($resource, API) {
  this.name = 'WashShop'
  this.query = API.washShop
  this.export = API.washShopExport
  this.new = function() {
    $state.go('app.shop-new', { type: 'washShop' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.shop-new', { type: 'washShop', id: rowData.shopId })
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
    value: '',
    name: '商家名称',
    type: 'typeahead',
    API: API.washShopName
  }, {
    key: 'statusId',
    value: '',
    name: '状态',
    type: 'select',
    options: [],
    API: API.shopStatus
  }];
  this.meta = {
    header: [{
      text: '商家编号',
      apiName: 'shopId'
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '合同号',
      apiName: 'contractId'
    }, {
      text: '店主姓名',
      apiName: 'hostName'
    }, {
      text: '商家电话',
      apiName: 'shopPhoneNumber'
    }, {
      text: '营业时间',
      apiName: 'openTime'
    }, {
      text: '商家地址',
      apiName: 'shopAddress'
    }, {
      text: '合作时间',
      apiName: 'hireTime'
    }, {
      text: '区域',
      apiName: 'regionName'
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
      apiName: 'totalSaleVolume'
    }, {
      text: '平均月单量',
      apiName: 'avgMonthSaleVolume'
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
