const baseUrl = 'http://www.lifeuxuan.com/index.php';
const URL = {
  'login': '/mgr/admin/login',
  'logout': '/mgr/admin/logout',
  'shopStatus': '/mgr/comm/shopstatus',
  'timeUnit': '/mgr/comm/timeunit',
  'region': '/mgr/comm/region',
  'guardName': '/mgr/fquery/eguardname',
  'guardNickName': '/mgr/fquery/eguardnickname',
  'guardStatus': '/mgr/comm/eguardstatus',
  'accountStatus': '/mgr/comm/accountstatus',
  'orderType': '/mgr/comm/ordertype',
  'orderstatus': '/mgr/comm/orderstatus',
  'isOrderTimeout': '/mgr/comm/timeout',
  /*Wash meta-------------------------*/
  'washFilterStatus': '/mgr/comm/washstatus',
  'washFilterHot': '/mgr/comm/washhot',
  'washFilterSale': '/mgr/comm/washonsale',
  'washFilterClass': '/mgr/classify/wash/query',
  'washExport': '/mgr/wash/export',
  'washShopName': '/mgr/fquery/washshopname',
  'washUnit': '/mgr/comm/washunit',
  /*Fruit meta---------------------------*/
  'fruitFilterStatus': '/mgr/comm/fruitstatus',
  'fruitFilterHot': '/mgr/comm/fruithot',
  'fruitFilterSale': '/mgr/comm/fruitonsale',
  'fruitFilterClass': '/mgr/classify/fruit/query',
  'fruitExport': '/mgr/fruit/export',
  'fruitShopName': '/mgr/fquery/fruitshopname',
  'fruitUnit': '/mgr/comm/fruitunit',
  /*Wash  ---------------------------*/
  'wash': '/mgr/wash/query',
  'washAdd': '/mgr/wash/add',
  'washRemove': '/mgr/wash/disable',
  'washEdit': '/mgr/wash/edit',
  'washDetail': '/mgr/wash/editprequery',
  'washClass': '/mgr/classify/wash/query',
  'washClassAdd': '/mgr/classify/wash/add',
  'washClassEdit': '/mgr/classify/wash/edit',
  'washClassRemove': '/mgr/classify/wash/disable',
  /*Fruit  ------------------------*/
  'fruit': '/mgr/fruit/query',
  'fruitAdd': '/mgr/fruit/add',
  'fruitRemove': '/mgr/fruit/disable',
  'fruitEdit': '/mgr/fruit/edit',
  'fruitDetail': '/mgr/fruit/editprequery',
  'fruitClass': '/mgr/classify/fruit/query',
  'fruitClassAdd': '/mgr/classify/fruit/add',
  'fruitClassEdit': '/mgr/classify/fruit/edit',
  'fruitClassRemove': '/mgr/classify/fruit/disable',
  /*Shop  ------------------------------*/
  'washShop': '/mgr/washshop/query',
  'washShopExport': '/mgr/washshop/export',
  'washShopDisable': '/mgr/washshop/disable',
  'washShopDetail': '/mgr/washshop/editprequery',
  'washShopEdit': '/mgr/washshop/edit',
  'fruitShop': '/mgr/fruitshop/query',
  'fruitShopExport': '/mgr/fruitshop/export',
  'fruitShopDisable': '/mgr/fruitshop/disable',
  'fruitShopDetail': '/mgr/fruitshop/editprequery',
  'fruitShopEdit': '/mgr/fruitshop/edit',
  /*Guard  ------------------------------*/
  'guard': '/mgr/eguard/query',
  'guardExport': '/mgr/eguard/export',
  'guardDisable': '/mgr/eguard/disable',
  'guardDetail': '/mgr/eguard/editprequery',
  'guardEdit': '/mgr/eguard/edit',
  /*Order  ------------------------------*/
  'order': '/mgr/order/query',
  'orderExport': '/mgr/order/export',
  'guardFetch': '/mgr/order/fetcheguard',
  'guardSend': '/mgr/order/sendeguard',
  'reFetch': '/mgr/order/fetcheguard/dispatch',
  'reSend': '/mgr/order/sendeguard/dispatch',
  /*OrderTime  ------------------------------*/
  'orderTime': '/mgr/orderfollow/query',
  'orderTimeExport': '/mgr/orderfollow/export',
  /*Order  ------------------------------*/
  'orderGoods': '/mgr/order/query',
  'orderGoodsExport': '/mgr/order/export',
}

angular.module('erp.services')

.service('API', function($resource) {
  let service = this
  for (var p in URL) {
    (function(param) {
      service[p] = $resource(baseUrl + URL[p])
    })(p);
  }
})

.service('User', function() {
  this.id = ''
})
