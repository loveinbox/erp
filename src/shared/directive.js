function tableData() {
  return {
    restrict: 'E',
    scope: {
      filters: '=?',
      filtersValue: '=?',
      header: '=?',
      body: '=?',
      action: '=?',
    },
    templateUrl: '/shared/tableData.html',
    controller: function($scope) {
      $scope.asd = '123'
        // $scope.filtersValue = {}
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
    </label>`,
    link: function($scope, $element, $attr) {
      // $scope.inputValue = $scope.filterValue
      // console.log($scope.inputValue)
      // $element.append('<input type="' + $scope.filterData.type + '" ng-model="inputValue">')
    }
  }
}

angular.module('erp.directives')
  .directive('filter', filter)
  .directive('tableData', tableData);
