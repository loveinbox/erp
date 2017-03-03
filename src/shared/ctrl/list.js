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

  if (!Entity) {
    console.error('[MY ERROR]type error!')
    $state.go('login')
  }

  $scope.data = Object.assign({}, Entity.listMetaData, {
    body: [{ a: '123',c:'123sdf' }, { 'a': 1234 }]
  })

  // $scope.metaData = Entity.listMetaData;
  // $scope.body = [{ a: '123' }, { 'a': 1234 }]
  $scope.$on('query', function() {
    Entity.query();
  })
  $scope.$on('new', function() {
    // $state.go('app.goods-fruit-new')
    Entity.new()
  })
  $scope.$on('export', function() {
    Entity.export()
      // $state.go('app.goods-fruit-add')
  })

})
