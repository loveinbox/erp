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

.controller('GoodsFruitCtrl', function($scope) {
  $scope.data = {
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
    }
  }
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
      action: '=?',
    },
    templateUrl: '/shared/tableData.html',
    controller: function($scope) {
      $scope.asd = '123'
        // $scope.filtersValue = {}
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
    </label>`,
    link: function($scope, $element, $attr) {
      // $scope.inputValue = $scope.filterValue
      // console.log($scope.inputValue)
      // $element.append('<input type="' + $scope.filterData.type + '" ng-model="inputValue">')
    }
  }
}

angular.module('erp.directives')
  .directive('filter', filter)
  .directive('tableData', tableData);
