angular.module('erp')

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
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

  .state('app.list', {
    url: '/list/:type',
    templateUrl: '/shared/template/list.html',
  })

  .state('app.goods-fruit-new', {
    url: '/goods-fruit/new/:id',
    templateUrl: '/goods/fruit-new.html',
  })

  .state('app.goods-fruit-class', {
    url: '/goods-fruit/class',
    templateUrl: '/goods/fruit-class.html',
  })

  .state('app.goods-wash-new', {
    url: '/goods-wash/new/:id',
    templateUrl: '/goods/wash-new.html',
  })

  .state('app.goods-wash-class', {
    url: '/goods-wash/class',
    templateUrl: '/goods/wash-class.html',
  })

  ;
  $urlRouterProvider.otherwise('/login');
})
