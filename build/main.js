angular.module('erp', ['erp.controllers', 'erp.directives', 'erp.services', 'ui.router'])
angular.module('erp.controllers', [])
angular.module('erp.directives', [])
angular.module('erp.services', ['ngResource'])

angular.module('erp')
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q) {
      return {
        'response': function(response) {
          if (response.data.code === undefined) {
            return response;
          } else {
            if (response.data.code === 0) {
              return response.data;
            } else {
              alert(response.data.msg);
              return $q.reject(response);
            }
          }
        }
      };
    });
  });

angular.module('erp')
  .config(function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/login/index.html'
      })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: '/app/frame.html',
    })

    .state('app.orders', {
      url: '/orders',
      templateUrl: '/orders/index.html',
    })

    .state('app.goods-fruit', {
      url: '/goods-fruit',
      templateUrl: '/goods/fruit.html',
    })

    ;
  })

const baseUrl = 'http://www.lifeuxuan.com/index.php';
const URL = {
  'login': '/account/eguard/login'
}

angular.module('erp.services')

.service('API', function($resource) {
  let service = this
  for (var p in URL) {
    (function(param) {
      service[p] = function() {
        return $resource(baseUrl + URL[p])
      }
    })(p);
  }
})

;
angular.module('erp.controllers')

.controller('GoodsFruitCtrl', function($scope) {
  $scope.data = initData();

  function initData(argument) {
    return {
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
      }]
    }
  }
})

;
angular.module('erp.controllers')

.controller('FrameCtrl', function($scope) {
  $scope.navToggle = function(event) {
    var dom = $(event.target)
    if (dom.is('header') || dom.is('i')) {
      dom.closest('div')
        .find('i').toggleClass('rotate').end()
        .find('ul').toggle()
    }
  }

  $scope.bva = 123

})

;
angular.module('erp.controllers')

.controller('LoginCtrl', function($scope, API) {
  $scope.user = {
    name: '',
    password: ''
  }
  $scope.action = {}

  $scope.action.login = function() {
    API['login']().get({}, function(data) {
      console.log(data);
    });
  }

})

function tableData() {
  return {
    restrict: 'E',
    scope: {
      filters: '=?',
      filtersValue: '=?',
      header: '=?',
      body: '=?',
      actions: '=?',
    },
    templateUrl: '/shared/tableData.html',
    controller: function($scope) {
      $scope.actionHandler = function(item, action) {
        console.log(item)
        console.log(action)
      }
    }
  }
}

function filter() {
  return {
    restrict: 'E',
    scope: {
      filterData: '=?',
      filterValue: '=?'
    },
    template: `
    <label>
      <span>{{filterData.name}}：</span>
      <input type="{{filterData.type}}" ng-model="filterValue">
    </label>`
  }
}

angular.module('erp.directives')
  .directive('filter', filter)
  .directive('tableData', tableData);
