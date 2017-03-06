const baseUrl = 'http://www.lifeuxuan.com/index.php';
const URL = {
  'login': '/mgr/admin/login',
  'logout': '/mgr/admin/logout',
  /*Wash  -------------------------*/
  'washFilterStatus': '/mgr/comm/washstatus',
  'washFilterHot': '/mgr/comm/washhot',
  'washFilterSale': '/mgr/comm/washonsale',
  'washFilterClass': '/mgr/classify/wash/query',
  'washExport': '/mgr/wash/export',
  'washShopName': '/mgr/fquery/washshopname',
  'washUnit': '/mgr/comm/washunit',
  //-----CRUD-----
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
