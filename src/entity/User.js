angular.module('erp.services')

.service('User', function($resource, $state, API) {
  this.name = 'User'
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
    typeaheadKey: 'eguardName',
    name: '微信昵称',
    type: 'typeahead',
    API: API.guardName
  }, {
    typeaheadKey: 'eguardNickName',
    name: '手机号',
    type: 'typeahead',
    API: API.guardNickName
  }, {
    key: 'hireTime',
    name: '日期',
    type: 'dateInputRange'
  }, {
    key: 'statusId',
    name: '是否认证',
    type: 'select',
    API: API.guardStatus
  }];
  this.meta = {
    header: [{
      text: '用户ID',
      apiName: 'eguardName',
    }, {
      text: '微信昵称',
      apiName: 'eguardId',
    }, {
      text: '手机号',
      apiName: 'eguardName',
      formKey: 'eguardName',
    }, {
      text: '认证',
      apiName: 'eguardNickName'
    }, {
      text: '最近登录时间',
      apiName: 'accountStatusName',
    }, {
      text: '最近购买时间',
      apiName: 'eguardAddress'
    }, {
      text: '登录次数',
      apiName: 'longitude'
    }, {
      text: '购买次数',
      apiName: 'latitude'
    }, {
      text: '关注时间',
      apiName: 'hireTime',
      type: 'date',
      isHideInForm: true
    }, {
      text: '首次购买时间',
      apiName: 'eguardPhoneNumber',
    }, {
      text: '消费总额',
      apiName: 'identifiedCardNo',
    }],
    button: {
      query: true,
      export: true
    }
  }

})
