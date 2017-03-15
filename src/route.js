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

  .state('app.new', {
    url: '/goods/new/:type/:id',
    templateUrl: '/shared/template/new.html',
    cache: false
  })

  .state('app.goods-class', {
    url: '/goods/class/:type/:id',
    templateUrl: '/goods/class.html',
  })

  ;
  $urlRouterProvider.otherwise('/login');
})
