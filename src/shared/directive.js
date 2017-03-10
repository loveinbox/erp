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
      filter: '='
    },
    templateUrl: '/shared/template/filterBuilder.html',
    controller: function($scope) {
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
      actionKey: '='
    },
    template: `<span>
    <ng-transclude ng-click="show()"></ng-transclude>
    <div id="modal" ng-show="isShowModal" style="position: absolute;
      top: -20px;
      right: 0px;
      width: 285px;
      height: 50px;
      background: #fff;
      box-shadow: 5px 5px 5px #eee;
      border-radius: 10px;
      z-index: 200">
      <input type="text"
          ng-model="guardId"
          placeholder="请输入管家"
          uib-typeahead="state.id as state.name for state in getOptions($viewValue)"
          typeahead-loading="loadingLocations"
          typeahead-no-results="noResults"
          typeahead-input-formatter="formatLabel($model)"
          class="form-control" style='display:inline-block;width: 200px;margin: 9px;'>
      <button type="submit"
          class="btn btn-primary"
          ng-click="submit()">确认</button>
      </div>
    </span>`,
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
      $scope.guardId = 0
      $scope.show = function() {
        $scope.isShowModal = true
      }
      $scope.submit = function() {
        $scope.isShowModal = false
        $scope.goApi.save({
          'orderId': $scope.data.orderId,
          'orderTypeId': $scope.data.orderTypeId,
          'eguardId': $scope.guardId
        }, function() {
          alert('改派成功')
        })
      }
      $scope.getOptions = function(keyword) {
        return $scope.getApi.get({
          currentEguardId: $scope.rowData[$scope.actionKey]
        }).$promise.then(function(data) {
          $scope.typeaheadOptions = data.data
          return data.data
        })
      }
    }
  }
}

angular.module('erp.directives')
  .directive('filter', filter)
  .directive('spanModal', spanModal)
  .directive('tableData', tableData);
