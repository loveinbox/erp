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
        return API.guardRemove.get(rowData).$promise
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
      text: '管家姓名',
      apiName: 'eguardName',
    }, {
      text: '管家编号',
      apiName: 'eguardId',
      isHideInForm: true
    }, {
      text: '管家昵称',
      apiName: 'eguardNickName'
    }, {
      text: '管家状态',
      apiName: 'statusName',
      formKey: 'statusId',
      type: 'select',
      API: API.guardStatus,
      isHideInForm: true
    }, {
      text: '账号状态',
      formKey: 'accountStatusId',
      type: 'select',
      API: API.accountStatus,
      isHideInTable: true
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
      apiName: 'regionName',
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
  this.query = API.guardOrders
  this.export = API.guardOrdersExport
  this.new = function() {
    $state.go('app.new', { type: 'guardOrders' })
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
    key: 'orderTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'eguardPhoneNumber',
    name: '手机号',
  }];
  this.meta = {
    header: [{
      text: '管家名称',
      apiName: 'eguardName'
    }, {
      text: '管家昵称',
      apiName: 'eguardNickName',
    }, {
      text: '手机号',
      apiName: 'eguardPhoneNumber'
    }, {
      text: '总配送订单数',
      apiName: 'totalOrderVolume'
    }, {
      text: '水果订单总数',
      apiName: 'fruitOrderVolume'
    }, {
      text: '水果订单总金额',
      apiName: 'fruitOrderMoney'
    }, {
      text: '水果及时送达率',
      apiName: 'fruitOrderFinishRate'
    }, {
      text: '洗衣订单总数',
      apiName: 'washOrderVolume'
    }, {
      text: '洗衣订单总金额',
      apiName: 'washOrderMoney'
    }, {
      text: '洗衣及时送达率',
      apiName: 'washOrderFinishRate'
    }, {
      text: '拒单量',
      apiName: 'refuseOrderVolume'
    }, {
      text: '拒单率',
      apiName: 'refuseOrderRate'
    }],
    button: {
      query: true,
      export: true
    }
  }

})
