function tableData() {
  return {
    restrict: 'E',
    scope: {
      filters: '=?',
      filtersValue: '=?',
      header: '=?',
      body: '=?',
      actions: '=?',
      button: '=?'
    },
    templateUrl: '/shared/tableData.html',
    controller: function($scope) {
      $scope.page = {
        total: 100,
        current: 1
      }
      $scope.$watch('page.current', function() {
        $scope.page.show = $scope.page.total > 10 ? 10 : $scope.page.total
        $scope.page.adjust = $scope.page.current - 5 <= 0 ?
          $scope.page.current - 1 :
          $scope.page.current + 5 > $scope.page.total ? 9 : 5
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
            $scope.page.current = $scope.page.current < $scope.page.total ? $scope.page.current + 1 : $scope.page.total;
            break;
          case 'end':
            $scope.page.current = $scope.page.total;
            break;
          default:
            $scope.page.current = page
        }
      }
      $scope.actionHandler = function(item, action) {
        console.log(item)
        console.log(action)
      }
      $scope.buttonAction = function(type) {
        $scope.$emit(type)
      }
    }
  }
}

function filter() {
  return {
    restrict: 'E',
    scope: {
      filterData: '=?',
      filterValue: '=?'
    },
    template: `
    <label>
      <span>{{filterData.name}}：</span>
      <input type="{{filterData.type}}" ng-model="filterValue">
    </label>`
  }
}

angular.module('erp.directives')
  .directive('filter', filter)
  .directive('tableData', tableData);
