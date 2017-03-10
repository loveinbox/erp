angular.module('erp.services')

.service('GuardWage', function($resource, $state, API) {
  this.name = 'GuardWage'
  this.query = API.order
  this.export = API.orderExport
  this.filters = [{
    key: 'shopName',
    name: '管家姓名',
    type: 'typeahead',
  }, {
    key: 'shopName',
    name: '管家昵称',
    type: 'typeahead',
  }, {
    key: 'shopName',
    name: '手机号',
    type: 'typeahead',
    API: API.washShopName
  }, {
    key: 'date',
    name: '日期',
    type: 'dateInputRange'
  }];
  this.meta = {
    header: [{
      text: '管家姓名',
      apiName: 'shopId',
    }, {
      text: '管家昵称',
      apiName: 'shopName'
    }, {
      text: '手机号',
      apiName: 'contractId',
    }, {
      text: '水果总订单',
      apiName: 'hostName'
    }, {
      text: '水果总收入',
      apiName: 'shopPhoneNumber'
    }, {
      text: '洗衣总订单',
      apiName: 'openTime',
    }, {
      text: '洗衣总收入',
      apiName: 'shopAddress'
    }, {
      text: '订单总数',
      apiName: 'openTime',
    }, {
      text: '总收入',
      apiName: 'shopAddress'
    }, {
      text: '服务订单总金额',
      apiName: 'openTime',
    }, {
      text: '单均收入',
      apiName: 'shopAddress'
    }],
    button: {
      query: true,
      export: true
    }
  }

})


.service('ShopWage', function($resource, $state, API) {
  this.name = 'ShopWage'
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
    name: '商家名称',
    type: 'typeahead',
  }, {
    key: 'shopName',
    name: '商家分类',
    type: 'typeahead',
  }, {
    key: 'date',
    name: '日期',
    type: 'dateInputRange'
  }];
  this.meta = {
    header: [{
      text: '商家分类',
      apiName: 'shopId',
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '地址',
      apiName: 'contractId',
    }, {
      text: '商家电话',
      apiName: 'hostName'
    }, {
      text: '总收入',
      apiName: 'shopPhoneNumber'
    }, {
      text: '总订单数',
      apiName: 'openTime',
    }, {
      text: '单均收入',
      apiName: 'shopAddress'
    }],
    button: {
      query: true,
      export: true
    }
  }

})
