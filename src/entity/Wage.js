angular.module('erp.services')

.service('GuardWage', function($resource) {
  this.name = 'GuardWage'
  this.listMetaData = {
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

.service('ShopWage', function($resource) {
  this.name = 'ShopWage'
  this.listMetaData = {
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
