const baseUrl = 'http://www.lifeuxuan.com/index.php';
const URL = {
  'login': '/mgr/admin/login',
  'logout': '/mgr/admin/logout',
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
