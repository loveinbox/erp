;
angular.module('erp.controllers')

.controller('listCtrl', function($scope, $state, $stateParams, QueryParams,
  Customer, Fruit, Wash, Orders, OrderTime, OrderGoods,
  Guard, GuardOrders, FruitShop, WashShop, GuardWage,
  ShopWage, Banner, GuardApply, ShopApply) {
  const typeMap = {
    'user': Customer,
    'fruit': Fruit,
    'wash': Wash,
    'orders': Orders,
    'orderTime': OrderTime,
    'orderGoods': OrderGoods,
    'guard': Guard,
    'guardOrders': GuardOrders,
    'fruitShop': FruitShop,
    'washShop': WashShop,
    'guardWage': GuardWage,
    'shopWage': ShopWage,
    'banner': Banner,
    'guardApply': GuardApply,
    'shopApply': ShopApply
  }
  let type = $stateParams.type;
  let Entity = typeMap[type];

  if (!Entity) {
    console.error('[MY ERROR]No Entity!')
    $state.go('login')
  }

  //init
  pageInit()

  $scope.$on('query', function() {
    $scope.page = {
      current: 1
    }
    query(buildParam())
  })
  $scope.$on('page-query', function() {
    query(buildParam())
  })
  $scope.$on('new', function() {
    Entity.new()
  })
  $scope.$on('export', function() {
    Entity.export.get(buildParam(), function(data) {
      let url = data.data.path
      window.open('http://www.lifeuxuan.com/' + url)
    })
  })
  $scope.$on('rowAction', function(action, actionSwitch, rowData) {
    let promise = Entity.rowActionHandler[actionSwitch](rowData)
    if (promise && typeof promise.then === 'function') {
      promise.then(function() {
        alert('操作成功')
        query(QueryParams.param[type])
      })
    }
  })

  function pageInit() {
    $scope.data = Entity.meta
    $scope.filters = Entity.filters
    $scope.pageDefault = QueryParams.param[type] ? QueryParams.param[type].page : undefined
    $scope.filtersDefault = QueryParams.param[type] ? QueryParams.param[type].filters : undefined
    query(QueryParams.param[type])
  }

  function query(param) {
    QueryParams.param[type] = param
    param = param || {
        page: 1
    }
    Entity.query.get(param, function(data) {
      $scope.data.body = data.data.content
      $scope.page.totalPage = data.data.totalPage
    })
  }

  function buildParam() {
    let param = {
      page: $scope.page.current
    }
    for (var p in $scope.filters) {
      let value = $scope.filters[p]
      while (value) {
        if (value.type === 'dateInputRange') {
          let temp = value.key + '[]'
          if (value.value || value.value2) {
            param[temp] = [
              value.value ? (new Date(value.value).getTime()) / 1000 : '',
              value.value2 ? (new Date(value.value2).getTime()) / 1000 : ''
            ]
          }
        } else {
          if (value.value) {
            param[value.key] = value.value
          }
        }
        value = value.next
      }
    }
    return param
  }

})
