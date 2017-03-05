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
        // key: '=',
        // name: '=',
        // type: '=?',
        // value: '=?',
        // options: '=?',
        // method: '=?'
    },
    templateUrl: '/shared/template/filter.html'
  }
}

function spanModal() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    template: `<span>
    <ng-transclude ng-click="show()"></ng-transclude>
    <div id="modal" ng-show="isShowModal" style="position: absolute;
      top: -50px;
      right: 0px;
      width: 285px;
      height: 50px;
      background: #fff;
      box-shadow: 5px 5px 5px #eee;
      border-radius: 10px;
      z-index: 200">
      <input type="text"
          ng-model="form.value"
          placeholder="请输入管家"
          uib-typeahead="state.id as state.name for state in typeaheadOptions"
          typeahead-loading="loadingLocations"
          typeahead-no-results="noResults"
          typeahead-input-formatter="formatLabel($model)"
          class="form-control" style='display:inline-block;width: 200px;margin: 9px;'>
      <button type="submit"
          class="btn btn-primary"
          ng-click="submit()">确认</button>
      </div>
    </span>`,
    controller: function($scope) {
      $scope.isShowModal = false
      $scope.typeaheadOptions = ['123', '12333', '234']
      $scope.show = function() {
        $scope.isShowModal = true
      }
      $scope.submit = function() {
        $scope.isShowModal = false
      }
    }
  }
}

angular.module('erp.directives')
  .directive('filter', filter)
  .directive('spanModal', spanModal)
  .directive('tableData', tableData);
