angular.module('erp.services')

.service('Guard', function($resource, $state, API) {
  this.name = 'Guard'
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
    name: '管家名称',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'eguardNickName',
    name: '管家昵称',
    type: 'typeahead',
    API: API.guardNickName
  }, {
    key: 'statusId',
    name: '管家状态',
    type: 'select',
    API: API.guardStatus
  }, {
    key: 'accountStatusId',
    name: '账号状态',
    type: 'select',
    API: API.accountStatus
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
      text: '管家名称',
      apiName: 'eguardName',
    }, {
      text: '管家编号',
      apiName: 'eguardId',
      isHideInForm: true
    }, {
      text: '管家名称',
      formKey: 'eguardName',
      isHideInTable: true
    }, {
      text: '管家昵称',
      apiName: 'eguardNickName'
    }, {
      text: '管家状态',
      apiName: 'accountStatusName',
      formKey: 'accountStatusId',
      type: 'select',
      API: API.guardStatus
    }, {
      text: '管家地址',
      apiName: 'eguardAddress'
    }, {
      text: '经度',
      apiName: 'longitude'
    }, {
      text: '纬度',
      apiName: 'latitude'
    }, {
      text: '合作时间',
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
    }, {
      text: '账号状态',
      apiName: 'accountStatusName',
      formKey: 'accountStatusId',
      type: 'select',
      API: API.accountStatus,
      isHideInForm: true
    }, {
      text: '账号',
      apiName: 'account',
      isTableInForm: true
    }, {
      text: '账号密码',
      apiName: 'password',
      isTableInForm: true
    }, {
      text: '管家图片',
      formKey: 'eguardImgsList',
      type: 'imgUpload',
      isHideInTable: true,
      union: true,
      boxes: [{
        value: 1,
        text: '头像'
      }]
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
      export: true
    }
  }

})

.service('GuardOrders', function($resource, $state, API) {
  this.name = 'GuardOrders'
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
    name: '管家名称',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'eguardNickName',
    name: '管家昵称',
    type: 'typeahead',
    API: API.guardNickName
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
      text: '水果名称',
      apiName: 'productName'
    }, {
      text: '水果描述',
      formKey: 'productDescription',
      isHideInTable: true
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
      apiName: 'productAvaliable'
    }, {
      text: '规格',
      apiName: 'productMeasure'
    }, {
      text: '水果分类',
      apiName: 'classifyName',
      formKey: 'classifyId',
      type: 'select',
      API: API.fruitClass
    }, {
      text: '商家名称',
      apiName: 'shopName',
      formKey: 'shopId',
      type: 'typeahead',
      API: API.fruitShopName
    }, {
      text: '状态',
      apiName: 'statusName',
      formKey: 'statusId',
      type: 'select',
      API: API.fruitFilterStatus
    }, {
      text: '上架日期',
      apiName: 'marketDate',
      type: 'date'
    }, {
      text: '热卖',
      apiName: 'onSaleName',
      formKey: 'onSaleId',
      type: 'select',
      API: API.fruitFilterSale
    }, {
      text: '爆款',
      apiName: 'hotName',
      formKey: 'hotId',
      type: 'select',
      API: API.fruitFilterHot
    }, {
      text: '总销量',
      apiName: 'totalSaleVolume',
      isHideInForm: true
    }, {
      text: '图片',
      formKey: 'productImgsList',
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
