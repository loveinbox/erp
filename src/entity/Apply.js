angular.module('erp.services')

.service('GuardApply', function($resource, $state, API) {
  this.name = 'GuardApply'
  this.query = API.applyGuard
  this.rowActionHandler = {
    'agree': function(rowData) {
        return API.applyGuardAgree.get(rowData).$promise
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        return API.applyGuardRemove.get(rowData).$promise
      }
    }
  }
  this.filters = [{
    key: 'eguardName',
    name: '管家名称',
    type: 'typeahead',
    API: API.guardName
  }, {
    key: 'applyTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'eguardPhoneNumber',
    name: '手机号',
  }];
  this.meta = {
    header: [{
      text: '申请编号',
      apiName: 'applyId',
      isHideInForm: true
    }, {
      text: '管家名称',
      apiName: 'applyName',
    }, {
      text: '管家昵称',
      apiName: 'userNickName'
    }, {
      text: '住址',
      apiName: 'applyAddress',
    }, {
      text: '注册时间',
      apiName: 'applyTime',
      type: 'date',
      isHideInForm: true
    }, {
      text: '手机号',
      apiName: 'applyPhoneNumber',
      // }, {
      //   text: '身份证',
      //   apiName: 'identifiedCardNo',
      // }, {
      //   text: '开户行',
      //   apiName: 'bankName'
      // }, {
      //   text: '支行',
      //   apiName: 'branchBankName'
      // }, {
      //   text: '银行卡',
      //   apiName: 'bankCardNo'
    }, {
      text: '区域',
      apiName: 'applyRegionName',
      type: 'select',
      API: API.region
    }],
    actions: [{
      text: '成为管家',
      type: 'agree'
    }, {
      text: '废弃',
      type: 'disable'
    }],
    button: {
      query: true,
    }
  }

})

.service('ShopApply', function($resource, $state, API) {
  this.name = 'ShopApply'
  this.query = API.applyShop
  this.rowActionHandler = {
    'agreeFruitHost': function(rowData) {
      let data = Object.assign({}, rowData, { shopTypeId: 17001 })
      return API.applyShopAgreeHost.get(data).$promise
    },
    'agreeWashHost': function(rowData) {
      let data = Object.assign({}, rowData, { shopTypeId: 17002 })
      return API.applyShopAgreeHost.get(data).$promise
    },
    'agree': function(rowData) {
      return API.applyShopAgree.get(rowData).$promise
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        return API.applyShopRemove.get(rowData).$promise
      }
    }
  }
  this.filters = [{
    key: 'shopName',
    name: '商家名称',
  }, {
    key: 'applyTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'shopPhoneNumber',
    name: '手机号',
  }];
  this.meta = {
    header: [{
      text: '合同号',
      apiName: 'contractId'
    }, {
      text: '商家名称',
      apiName: 'shopName'
    }, {
      text: '姓名',
      apiName: 'shopHostName'
    }, {
      text: '手机号',
      apiName: 'shopPhoneNumber'
    }],
    actions: [{
      text: '成为水果店主',
      type: 'agreeFruitHost'
    }, {
      text: '成为洗衣店主',
      type: 'agreeWashHost'
    }, {
      text: '成为店员',
      type: 'agree'
    }, {
      text: '废弃',
      type: 'disable'
    }],
    button: {
      query: true,
    }
  }

})
