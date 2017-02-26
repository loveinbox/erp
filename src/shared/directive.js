function tableData() {
  return {
    restrict: 'E',
    scope: {
      filters: '=?',
      filtersValue: '=?',
      header: '=?',
      body: '=?',
      actions: '=?',
    },
    templateUrl: '/shared/tableData.html',
    controller: function($scope) {
      $scope.actionHandler = function(item, action) {
        console.log(item)
        console.log(action)
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
