function tableData() {
  return {
    restrict: 'E',
    scope: {
      filters: '=?',
      header: '=?',
      body: '=?',
      actions: '=?',
      button: '=?',
      page: '='
    },
    templateUrl: '/shared/template/tableData.html',
    controller: function($scope) {
      $scope.$watch('page.current', function() {
        buildPage()
      })
      $scope.$watch('page.totalPage', function() {
        buildPage()
      })
      $scope.getNumber = function(num) {
        return new Array(num);
      }
      $scope.gotoPage = function(page) {
        switch (page) {
          case 'begin':
            $scope.page.current = 1;
            break;
          case 'pre':
            $scope.page.current = $scope.page.current > 1 ? $scope.page.current - 1 : 1;
            break;
          case 'next':
            $scope.page.current = $scope.page.current < $scope.page.totalPage ? $scope.page.current + 1 : $scope.page.totalPage;
            break;
          case 'end':
            $scope.page.current = $scope.page.totalPage;
            break;
          default:
            $scope.page.current = page
        }
        $scope.$emit('query')
      }
      $scope.rowActionHandler = function(action, rowData) {
        $scope.$emit('rowAction', action.type, rowData)
      }
      $scope.buttonAction = function(type) {
        $scope.$emit(type)
      }

      function buildPage() {
        $scope.page.show = $scope.page.totalPage > 10 ? 10 : $scope.page.totalPage
        $scope.page.adjust = $scope.page.current - 5 <= 0 ?
          $scope.page.current - 1 :
          $scope.page.current + 5 > $scope.page.totalPage ? 9 : 5
      }
    }
  }
}

function filter() {
  return {
    restrict: 'E',
    scope: {
      filter: '=',
      filterParam: '='
    },
    templateUrl: '/shared/template/filterBuilder.html',
    controller: function($scope) {
      if ($scope.filter) {
        let param = {}
        if ($scope.filter.paramKey) {
          param[$scope.filter.paramKey] = $scope.filterParam || ''
        }
        if ($scope.filter.API && $scope.filter.type === 'select') {
          $scope.filter.API.get(param, function(data) {
            $scope.filter.options = data.data
          })
        }
      }
      $scope.$watch('filterParam', function(ov, nv) {
        if ($scope.filter) {
          let param = {}
          if ($scope.filter.paramKey) {
            param[$scope.filter.paramKey] = $scope.filterParam || ''
          }
          if ($scope.filter.API && $scope.filter.type === 'select') {
            $scope.filter.API.get(param, function(data) {
              $scope.filter.options = data.data
            })
          }
        }
      })
      $scope.getOptions = function(method, key, param) {
        return method.get({
          [key]: param
        }).$promise.then(function(data) {
          $scope.typeaheadOptions = data.data
          return data.data
        })
      }
    }
  }
}

function spanModal($document) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      getApi: '=',
      goApi: '=',
      rowData: '=',
      actionKeys: '='
    },
    templateUrl: '/shared/template/spanModal.html',
    link: function($scope, element, attr) {
      var onClick = function(event) {
        var isChild = $(element).has(event.target).length > 0;
        var isSelf = element[0] == event.target;
        var isInside = isChild || isSelf;
        if (!isInside) {
          $scope.isShowModal = false
          $scope.$apply($scope.isShowModal)
        }
      }
      $scope.$watch('isShowModal', function(newValue, oldValue) {
        if (newValue !== oldValue && newValue == true) {
          $document.bind('click', onClick);
        } else if (newValue !== oldValue && newValue == false) {
          $document.unbind('click', onClick);
        }
      });
    },
    controller: function($scope) {
      $scope.isShowModal = false
      $scope.modal = {}
      $scope.show = function() {
        $scope.isShowModal = true
        $scope.getApi.get({
          'orderId': $scope.rowData.orderId,
          'orderTypeId': $scope.rowData.orderTypeId
        }, function(data) {
          $scope.modal.options = data.data
        })
      }
      $scope.submit = function() {
        $scope.isShowModal = false
        $scope.goApi.get({
          'orderId': $scope.rowData.orderId,
          'orderTypeId': $scope.rowData.orderTypeId,
          'eguardId': $scope.modal.guardId
        }, function() {
          $scope.$emit('query')
          alert('改派成功')
        })
      }

      // $scope.typeaheadOptions = []
      // $scope.formatLabel = function(model) {
      //   if (typeof model === 'object') {
      //     return model.name
      //   }
      //   for (var i = 0; i < $scope.typeaheadOptions.length; i++) {
      //     if (model === $scope.typeaheadOptions[i].id) {
      //       return $scope.typeaheadOptions[i].name;
      //     }
      //   }
      // };
      // $scope.getOptions = function(keyword) {
      //   let data = {}
      //   $scope.actionKeys.forEach(function function_name(value) {
      //     data[value] = $scope.rowData[value]
      //   })
      //   data.eguardName = keyword
      //   return $scope.getApi.get(data).$promise.then(function(data) {
      //     $scope.typeaheadOptions = data.data
      //     return data.data
      //   })
      // }
    }
  }
}

angular.module('erp.directives')
  .directive('filter', filter)
  .directive('spanModal', spanModal)
  .directive('tableData', tableData);
