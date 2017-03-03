;
angular.module('erp.controllers')

.controller('listCtrl', function($scope, $state, $stateParams,
  User, Fruit, Wash, Orders, OrderTime, OrderGoods,
  Guard, GuardOrder, FruitShop, WashShop, GuardWage, ShopWage, Banner) {
  const typeMap = {
    'user': User,
    'fruit': Fruit,
    'wash': Wash,
    'orders': Orders,
    'orderTime': OrderTime,
    'orderGoods': OrderGoods,
    'guard': Guard,
    'guardOrder': GuardOrder,
    'fruitShop': FruitShop,
    'washShop': WashShop,
    'guardWage': GuardWage,
    'shopWage': ShopWage,
    'banner': Banner,
  }
  let type = $stateParams.type;
  let Entity = typeMap[type];

  $scope.data = Entity.listMetaData

  if (!Entity) {
    console.error('[MY ERROR]No Entity!')
    $state.go('login')
  }

  //init
  page()
  query()
  getFilters()

  $scope.$on('query', function() {
    query()
  })
  $scope.$on('new', function() {
    Entity.new()
  })
  $scope.$on('export', function() {
    Entity.export.get({}, function(data) {
      let url = data.data.path
      window.open('http://www.lifeuxuan.com/' + url)
    })
  })

  function page() {
    $scope.data.page = {
      total: 100,
      current: 1
    }
  }

  function query() {
    let param = { page: $scope.data.page.current }
    for (var p in $scope.data.filters) {
      let value = $scope.data.filters[p]
      if (value.value)
        param[value.key] = value.value
    }
    Entity.query.get(param, function(data) {
      $scope.data.body = data.data
    })
  }

  function getFilters() {
    Entity.filters.forEach((value) => {
      value.API.get({}, function(data) {
        $scope.data.filters[value.key].options = data.data
      })
    })
  }

})
