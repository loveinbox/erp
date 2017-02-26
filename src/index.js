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
