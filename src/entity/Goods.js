angular.module('erp.services')

.service('Fruit', function($resource, $state, API) {
  this.name = 'Fruit'
  this.query = API.fruit
  this.export = API.fruitExport
  this.new = function() {
    $state.go('app.good-new', { type: 'fruit' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.good-new', { type: 'fruit', id: rowData.productId })
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        API.fruitRemove(rowData, function() {
          $state.go('app.lsit', { type: 'fruit' })
        })
      }
    }
  }
  this.filters = [{
    key: 'productName',
    value: '',
    name: '水果名称',
  }, {
    key: 'shopName',
    value: '',
    name: '商家名称',
  }, {
    key: 'classifyId',
    value: '',
    name: '商品分类',
    type: 'select',
    options: [],
    API: API.fruitFilterClass
  }, {
    key: 'status',
    value: '',
    name: '状态',
    type: 'select',
    options: [],
    API: API.fruitFilterStatus
  }, {
    key: 'hotId',
    value: '',
    name: '是否爆品',
    type: 'select',
    options: [],
    API: API.fruitFilterHot
  }, {
    key: 'onSaleId',
    value: '',
    name: '是否热卖',
    type: 'select',
    options: [],
    API: API.fruitFilterSale
  }];
  this.meta = {
    header: [{
      text: '商品名称',
      apiName: 'productName'
    }, {
      text: '售价',
      apiName: 'productPrice'
    }, {
      text: '佣金率',
      apiName: 'feeRate'
    }, {
      text: '管家抽成',
      apiName: 'eguardProfitRate'
    }, {
      text: '库存',
      apiName: 'totalSaleVolume'
    }, {
      text: '规格',
      apiName: 'productMeasure'
    }, {
      text: '水果分类',
      apiName: 'classifyName'
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '状态',
      apiName: 'statusName'
    }, {
      text: '上架日期',
      apiName: 'marketDate'
    }, {
      text: '热卖',
      apiName: 'onSaleName'
    }, {
      text: '爆款',
      apiName: 'hotName'
    }, {
      text: '总销量',
      apiName: 'totalSaleVolume'
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

.service('Wash', function($resource, $state, API) {
  this.name = 'Wash'
  this.query = API.wash
  this.export = API.washExport
  this.new = function() {
    $state.go('app.good-new', { type: 'wash' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.good-new', { type: 'wash', id: rowData.productId })
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        API.washRemove(rowData, function() {
          $state.go('app.lsit', { type: 'wash' })
        })
      }
    }
  }
  this.filters = [{
    key: 'productName',
    value: '',
    name: '衣服名称',
  }, {
    key: 'shopName',
    value: '',
    name: '商家名称',
  }, {
    key: 'classifyId',
    value: '',
    name: '商品分类',
    type: 'select',
    options: [],
    API: API.washFilterClass
  }, {
    key: 'status',
    value: '',
    name: '状态',
    type: 'select',
    options: [],
    API: API.washFilterStatus
  }, {
    key: 'hotId',
    value: '',
    name: '是否爆品',
    type: 'select',
    options: [],
    API: API.washFilterHot
  }, {
    key: 'onSaleId',
    value: '',
    name: '是否热卖',
    type: 'select',
    options: [],
    API: API.washFilterSale
  }];
  this.meta = {
    header: [{
      text: '衣服名称',
      apiName: 'productName'
    }, {
      text: '衣服分类',
      apiName: 'classifyName'
    }, {
      text: '清洗单位',
      apiName: 'productUnit'
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '状态',
      apiName: 'statusName'
    }, {
      text: '佣金率',
      apiName: 'feeRate'
    }, {
      text: '管家抽成',
      apiName: 'eguardProfitRate'
    }, {
      text: '售价',
      apiName: 'productPrice'
    }, {
      text: '热卖',
      apiName: 'onSaleName'
    }, {
      text: '爆款',
      apiName: 'hotName'
    }, {
      text: '上架日期',
      apiName: 'marketDate'
    }, {
      text: '总销量',
      apiName: 'totalSaleVolume'
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
