const baseUrl = 'http://www.lifeuxuan.com/index.php';
const URL = {
  'login': '/account/eguard/login'
}

angular.module('erp.services')

.service('API', function($resource) {
  let service = this
  for (var p in URL) {
    (function(param) {
      service[p] = function() {
        return $resource(baseUrl + URL[p])
      }
    })(p);
  }
})
