angular.module('erp', ['erp.controllers', 'erp.directives', 'erp.services', 'ui.router'])
angular.module('erp.controllers', [])
angular.module('erp.directives', [])
angular.module('erp.services', ['ngResource'])

angular.module('erp')
  .config(function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        cache: false,
        templateUrl: '/login/index.html'
      })

    .state('washSingleOrder', {
      url: '/washSingleOrder/:shopId/:orderId',
      cache: false,
      templateUrl: 'templates/washTemplates/washSingle-order.html ',
      controller: 'washSingleOrderCtrl'
    })

    ;
  });

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

.controller('LoginCtrl', function($scope, API) {
  $scope.user = {
    name: '',
    password: ''
  }
  $scope.action = {}

  $scope.action.login = function() {
    API['login']().get({}, function(data) {
      console.log(data);
    }, function(data) {
      alert('NO DATA MainPageHot');
    });
  }

})
