const baseUrl = 'http://www.lifeuxuan.com/index.php';
const URL = {
  'login': '/mgr/admin/login',
  'logout': '/mgr/admin/logout',
  'wash': '/mgr/wash/query',
  'washFilterStatus': '/mgr/comm/washstatus',
  'washFilterHot': '/mgr/comm/washhot',
  'washFilterSale': '/mgr/comm/washonsale',
  'washFilterClass': '/mgr/classify/wash/query',
  'washExport': '/mgr/wash/export'
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
