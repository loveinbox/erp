angular.module('erp.services')

.service('Orders', function($resource, $state, API) {
  this.name = 'Orders'
  this.query = API.order
  this.export = API.orderExport

  this.filters = [{
    key: 'orderTypeId',
    name: '订单分类',
    type: 'select',
    options: [],
    API: API.orderType,
    next: {
      key: 'statusId',
      name: '状态',
      type: 'select',
      paramKey: 'orderTypeId',
      options: [],
      API: API.orderstatus
    }
  }, {
    key: 'orderId',
    name: '订单号',
  }, {
    key: 'fetchEguardName',
    typeaheadKey: 'eguardName',
    name: '取货管家',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'sendEguardName',
    typeaheadKey: 'eguardName',
    name: '送回管家',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'orderTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'verifiedPhoneNumber',
    name: '注册手机号',
  }, {
    key: 'shopName',
    name: '商家名称',
    type: 'typeahead',
    API: API.OrderGoodsName
  }];
  this.meta = {
    header: [{
      text: '订单分类',
      apiName: 'orderTypeName'
    }, {
      text: '订单编号',
      apiName: 'orderId'
    }, {
      text: '注册手机号',
      apiName: 'verifiedPhoneNumber',
    }, {
      text: '收货人',
      apiName: 'rcvName'
    }, {
      text: '收货人电话',
      apiName: 'rcvPhone'
    }, {
      text: '收货地址',
      apiName: 'rcvAddress'
    }, {
      text: '商家名称',
      apiName: 'shopName',
    }, {
      text: '取货管家',
      apiName: 'fetchEguardName',
    }, {
      text: '送回管家',
      apiName: 'sendEguardName',
    }, {
      text: '订单金额',
      apiName: 'money',
    }, {
      text: '订单状态',
      apiName: 'statusName'
    }, {
      text: '下单时间',
      apiName: 'orderTime',
      type: 'date'
    }],
    actions: [{
      text: '改派取货',
      type: 'reFetch',
      keys: ['orderId', 'orderTypeId'],
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
    key: 'orderTypeId',
    name: '订单分类',
    type: 'select',
    options: [],
    API: API.orderType,
    next: {
      key: 'statusId',
      name: '状态',
      type: 'select',
      paramKey: 'orderTypeId',
      options: [],
      API: API.orderstatus
    }
  }, {
    key: 'orderId',
    name: '订单号',
  }, {
    key: 'fetchEguardName',
    name: '取货管家',
    typeaheadKey: 'eguardName',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'sendEguardName',
    name: '送回管家',
    typeaheadKey: 'eguardName',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'orderTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'timeoutId',
    name: '是否超时',
    type: 'select',
    API: API.isOrderTimeout,
  }];
  this.meta = {
    header: [{
      text: '订单分类',
      apiName: 'orderTypeName'
    }, {
      text: '订单号',
      apiName: 'orderId'
    }, {
      text: '订单状态',
      apiName: 'statusName'
    }, {
      text: '取回管家',
      apiName: 'fetchEguardName'
    }, {
      text: '送货管家',
      apiName: 'sendEguardName',
    }, {
      text: '超时送达/取衣',
      apiName: 'timeoutName'
    }, {
      text: '下单时间',
      apiName: 'orderTime',
    }, {
      text: '预约时间',
      apiName: 'preferTime',
    }, {
      text: '接单时间',
      apiName: 'acceptTime',
    }, {
      text: '取货/衣时间',
      apiName: 'fetchTime'
    }, {
      text: '送达洗衣店时间',
      apiName: 'arriveShopTime',
    }, {
      text: '开始清洗',
      apiName: 'startWashTime'
    }, {
      text: '清洗完成时间',
      apiName: 'finishWashTime'
    }, {
      text: '洗衣店取回时间',
      apiName: 'sendTime'
    }, {
      text: '送回完成时间',
      apiName: 'finishTime'
    }],
    button: {
      query: true,
      export: true
    }
  }

}).service('OrderGoods', function($resource, $state, API) {
  this.name = 'OrderGoods'
  this.query = API.orderGoods
  this.export = API.orderGoodsExport
  this.filters = [{
    key: 'orderTypeId',
    name: '订单分类',
    type: 'select',
    options: [],
    API: API.orderType,
  }, {
    key: 'orderId',
    name: '订单号',
  }];
  this.meta = {
    header: [{
      text: '订单分类',
      apiName: 'orderTypeName'
    }, {
      text: '订单编号',
      apiName: 'orderId'
    }, {
      text: '收货人',
      apiName: 'rcvName'
    }, {
      text: '取货管家',
      apiName: 'fetchEguardName',
    }, {
      text: '送回管家',
      apiName: 'sendEguardName',
    }, {
      text: '商家',
      apiName: 'shopName',
    }, {
      text: '订单商品明细',
      apiName: 'detailsList',
      type: 'list',
    }],
    actions: [{
      text: '改派取货',
      type: 'reFetch',
      keys: ['orderId', 'orderTypeId'],
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
