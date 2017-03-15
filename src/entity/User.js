angular.module('erp.services')

.service('User', function($resource, $state, API) {
  this.name = 'User'
  this.query = API.user
  this.export = API.userExport
  this.filters = [{
    key: 'nickName',
    name: '微信昵称',
  }, {
    key: 'userPhoneNumber',
    name: '手机号',
  }, {
    key: 'focusDate',
    name: '日期',
  }, {
    key: 'verifyId',
    name: '是否认证',
    type: 'select',
    API: API.userVerify
  }];
  this.meta = {
    header: [{
      text: '用户ID',
      apiName: 'customerId',
    }, {
      text: '微信昵称',
      apiName: 'nickName',
    }, {
      text: '手机号',
      apiName: 'userPhoneNumber',
    }, {
      text: '认证',
      apiName: 'verifyName'
    }, {
      text: '最近登录时间',
      apiName: 'lastVisitTime',
    }, {
      text: '最近购买时间',
      apiName: 'lastBuyTime'
    }, {
      text: '登录次数',
      apiName: 'totalVisitCount'
    }, {
      text: '购买次数',
      apiName: 'totalBuyCount'
    }, {
      text: '关注时间',
      apiName: 'focusTime',
      type: 'date',
    }, {
      text: '首次购买时间',
      apiName: 'firstBuyTime',
    }, {
      text: '消费总额',
      apiName: 'totalConsumeMoney',
    }],
    button: {
      query: true,
      export: true
    }
  }

})
