;
angular.module('erp.controllers')

.controller('listCtrl', function($scope, $state, $stateParams,
  User, Fruit, Wash, Orders, OrderTime, OrderGoods,
  Guard, GuardOrders, FruitShop, WashShop, GuardWage,
  ShopWage, Banner, GuardApply, ShopApply) {
  const typeMap = {
    'user': User,
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

  $scope.data = Entity.meta
  $scope.filters = Entity.filters

  if (!Entity) {
    console.error('[MY ERROR]No Entity!')
    $state.go('login')
  }

  //init
  pageInit()
  query()

  $scope.$on('query', function() {
    query()
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
  $scope.$on('rowAction', function(action, type, rowData) {
    Entity.rowActionHandler[type](rowData)
  })

  $scope.$on('modalConfirm', function(data) {
    console.log(data)
  })

  function pageInit() {
    $scope.data.page = {
      totalPage: 100,
      current: 1
    }
  }

  function query() {
    Entity.query.get(buildParam(), function(data) {
      $scope.data.body = data.data.content
      $scope.data.page.totalPage = data.data.totalPage
    })
  }

  function buildParam() {
    let param = { page: $scope.data.page.current }
    for (var p in $scope.filters) {
      let value = $scope.filters[p]
      if (value.type === 'dateInputRange') {
        let temp = value.key + '[]'
        if (value.value || value.value2) {
          param[temp] = [
            value.value ? new Date(value.value).getTime() : '',
            value.value2 ? new Date(value.value2).getTime() : ''
          ]
        }
      } else {
        if (value.value) {
          param[value.key] = value.value
        }
      }
    }
    console.log(param)
    return param
  }

})
