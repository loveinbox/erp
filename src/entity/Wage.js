angular.module('erp.services')

.service('GuardWage', function($resource, $state, API) {
  this.name = 'GuardWage'
  this.query = API.profitGuard
  this.export = API.profitGuardExport
  this.filters = [{
    key: 'eguardName',
    typeaheadKey: 'eguardName',
    name: '管家姓名',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'eguardNickName',
    typeaheadKey: 'eguardNickName',
    name: '管家昵称',
    type: 'typeahead',
    API: API.guardNickName
  }, {
    key: 'eguardPhoneNumber',
    name: '手机号',
  }, {
    key: 'orderTime',
    name: '日期',
    type: 'dateInputRange'
  }];
  this.meta = {
    header: [{
      text: '管家姓名',
      apiName: 'eguardName',
    }, {
      text: '管家昵称',
      apiName: 'eguardNickName'
    }, {
      text: '手机号',
      apiName: 'eguardPhoneNumber',
    }, {
      text: '水果总订单',
      apiName: 'fruitOrderVolume'
    }, {
      text: '水果总收入',
      apiName: 'fruitOrderVolume'
    }, {
      text: '洗衣总订单',
      apiName: 'washOrderVolume',
    }, {
      text: '洗衣总收入',
      apiName: 'washOrderProfit'
    }, {
      text: '订单总数',
      apiName: 'totalOrderVolume',
    }, {
      text: '总收入',
      apiName: 'totalOrderProfit'
    }, {
      text: '服务订单总金额',
      apiName: 'totalOrderMoney',
    }, {
      text: '单均收入',
      apiName: 'avgOrderProfit'
    }],
    button: {
      query: true,
      export: true
    }
  }

})


.service('ShopWage', function($resource, $state, API) {
  this.name = 'ShopWage'
  this.query = API.profitShop
  this.export = API.profitShopExport
  this.filters = [{
    key: 'shopName',
    name: '商家名称',
  }, {
    key: 'shopTypeId',
    name: '商家分类',
    type: 'select',
    API: API.shopType
  }, {
    key: 'orderTime',
    name: '日期',
    type: 'dateInputRange'
  }];
  this.meta = {
    header: [{
      text: '商家分类',
      apiName: 'shopTypeName',
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '地址',
      apiName: 'shopAddress',
    }, {
      text: '商家电话',
      apiName: 'shopPhoneNumber'
    }, {
      text: '总收入',
      apiName: 'totalOrderProfit'
    }, {
      text: '总订单数',
      apiName: 'totalOrderVolume',
    }, {
      text: '单均收入',
      apiName: 'avgOrderProfit'
    }],
    button: {
      query: true,
      export: true
    }
  }

})
