angular.module('erp', ['erp.controllers', 'erp.directives', 'erp.services', 'ui.router'])
angular.module('erp.controllers', [])
angular.module('erp.directives', [])
angular.module('erp.services', ['ngResource'])

angular.module('erp')
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q) {
      return {
        'response': function(response) {
          if (response.data.code === undefined) {
            return response;
          } else {
            if (response.data.code === 0) {
              return response;
            } else {
              alert(response.data.msg);
              return $q.reject(response);
            }
          }
        }
      };
    });
  });
