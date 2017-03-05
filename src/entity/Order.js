angular.module('erp.services')

.service('Orders', function($resource, API, Modal) {
  this.name = 'Orders'
  this.query = API.wash
  this.export = API.washExport
  this.new = function() {
    $state.go('app.goods-wash-new')
  }
  this.rowActionHandler = {
    'fetch': function(rowData, event) {
      1
      Modal.show(event)
    },
    'send': function(rowData, event) {
      1
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
      text: '改派取货',
      type: 'fetch',
      directive: 'modal'
    }, {
      text: '送回管家',
      type: 'send',
      directive: 'modal'
    }],
    button: {
      query: true,
      new: true,
      export: true
    }
  }

})

.service('OrderTime', function($resource) {
  this.name = 'OrderTime'
  this.meta = {
    header: [{
      text: '订单分类',
      apiName: ''
    }, {
      text: '订单号',
      apiName: ''
    }, {
      text: '注册手机',
      apiName: ''
    }, {
      text: '收货人',
      apiName: ''
    }, {
      text: '收货地址',
      apiName: ''
    }, {
      text: '商家名称',
      apiName: ''
    }, {
      text: '取货管家',
      apiName: ''
    }, {
      text: '送回官家',
      apiName: ''
    }, {
      text: '订单金额',
      apiName: ''
    }, {
      text: '订单状态',
      apiName: ''
    }, {
      text: '下单时间',
      apiName: ''
    }],
    filters: [{
      name: 'test',
      type: 'text'
    }, {
      name: 'test2',
      type: 'text'
    }],
    filtersValue: {
      'test': '123',
      'test2': '456'
    },
    actions: [{
      text: '改派取件',
      event: 'change-fetch'
    }, {
      text: '送回管家',
      event: 'change-send'
    }],
    button: {
      query: true,
      new: true,
      export: true
    }
  }

})

.service('OrderGoods', function($resource) {
  this.name = 'OrderGoods'
  this.meta = {
    header: [{
      text: '订单分类',
      apiName: ''
    }, {
      text: '订单号',
      apiName: ''
    }, {
      text: '注册手机',
      apiName: ''
    }, {
      text: '收货人',
      apiName: ''
    }, {
      text: '收货地址',
      apiName: ''
    }, {
      text: '商家名称',
      apiName: ''
    }, {
      text: '取货管家',
      apiName: ''
    }, {
      text: '送回官家',
      apiName: ''
    }, {
      text: '订单金额',
      apiName: ''
    }, {
      text: '订单状态',
      apiName: ''
    }, {
      text: '下单时间',
      apiName: ''
    }],
    filters: [{
      name: 'test',
      type: 'text'
    }, {
      name: 'test2',
      type: 'text'
    }],
    filtersValue: {
      'test': '123',
      'test2': '456'
    },
    actions: [{
      text: '改派取件',
      event: 'change-fetch'
    }, {
      text: '送回管家',
      event: 'change-send'
    }],
    button: {
      query: true,
      new: true,
      export: true
    }
  }

})
