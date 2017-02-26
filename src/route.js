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
