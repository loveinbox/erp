angular.module('erp.services')

.service('GuardApply', function($resource, $state, API) {
  this.name = 'GuardApply'
  this.query = API.guard
  this.export = API.guardExport
  this.new = function() {
    $state.go('app.new', { type: 'guard' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      debugger
      $state.go('app.new', { type: 'guard', id: rowData.eguardId })
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        API.guardRemove(rowData, function() {
          $state.go('app.lsit', { type: 'guard' })
        })
      }
    }
  }
  this.filters = [{
    key: 'eguardName',
    typeaheadKey: 'eguardName',
    name: '管家名称',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'hireTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'eguardPhoneNumber',
    name: '手机号',
  }];
  this.meta = {
    header: [{
      text: '管家编号',
      apiName: 'eguardId',
      isHideInForm: true
    }, {
      text: '管家名称',
      apiName: 'eguardName',
    }, {
      text: '管家昵称',
      apiName: 'eguardNickName'
    }, {
      text: '住址',
      apiName: 'accountStatusName',
    }, {
      text: '注册时间',
      apiName: 'hireTime',
      type: 'date',
      isHideInForm: true
    }, {
      text: '手机号',
      apiName: 'eguardPhoneNumber',
    }, {
      text: '身份证',
      apiName: 'identifiedCardNo',
    }, {
      text: '开户行',
      apiName: 'bankName'
    }, {
      text: '支行',
      apiName: 'branchBankName'
    }, {
      text: '银行卡',
      apiName: 'bankCardNo'
    }, {
      text: '区域',
      formKey: 'regionId',
      type: 'select',
      API: API.region
    }],
    actions: [{
      text: '成为管家',
      type: 'create'
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

.service('ShopApply', function($resource, $state, API) {
  this.name = 'ShopApply'
  this.query = API.fruit
  this.export = API.fruitExport
  this.new = function() {
    $state.go('app.new', { type: 'fruit' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.new', { type: 'fruit', id: rowData.productId })
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
    key: 'eguardName',
    name: '商家名称',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'hireTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'eguardPhoneNumber',
    name: '手机号',
  }];
  this.meta = {
    header: [{
      text: '合同号',
      apiName: 'productName'
    }, {
      text: '商家名称',
      formKey: 'productDescription',
      isHideInTable: true
    }, {
      text: '姓名',
      apiName: 'productPrice'
    }, {
      text: '手机号',
      apiName: 'feeRate'
    }],
    actions: [{
      text: '成为店主',
      type: 'create'
    }, {
      text: '成为店员',
      type: 'create-ee'
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
