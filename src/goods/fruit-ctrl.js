;
angular.module('erp.controllers')

.controller('fruitCtrl', function($scope, $state) {
    $scope.data = initData();
    $scope.$on('query', function() {
        // $state.go('app.goods-fruit-add')
    })
    $scope.$on('new', function() {
        $state.go('app.goods-fruit-new')
    })
    $scope.$on('export', function() {
        // $state.go('app.goods-fruit-add')
    })

    function initData(argument) {
        return {
            header: [{
                text: '订单分类',
                apiName: ''
            }, {
                text: '订单号',
                apiName: ''
            }, {
                text: '注册手机',
                apiName: ''
            }, {
                text: '收货人',
                apiName: ''
            }, {
                text: '收货地址',
                apiName: ''
            }, {
                text: '商家名称',
                apiName: ''
            }, {
                text: '取货管家',
                apiName: ''
            }, {
                text: '送回官家',
                apiName: ''
            }, {
                text: '订单金额',
                apiName: ''
            }, {
                text: '订单状态',
                apiName: ''
            }, {
                text: '下单时间',
                apiName: ''
            }],
            filters: [{
                name: 'test',
                type: 'text'
            }, {
                name: 'test2',
                type: 'text'
            }],
            filtersValue: {
                'test': '123',
                'test2': '456'
            },
            actions: [{
                text: '改派取件',
                event: 'change-fetch'
            }, {
                text: '送回管家',
                event: 'change-send'
            }],
            button: {
                query: true,
                new: true,
                export: true
            }
        }
    }
})

.controller('addFruitCtrl', function($scope) {

})

.controller('classFruitCtrl', function($scope) {
    function findSelected(fruitClass) {
        let selected = fruitClass.filter(function(value) {
            return value.isSelected;
        })
        if (selected.length !== 1) {
            return false
        } else {
            return selected
        }
    }
    $scope.newClass = function() {
        $scope.fruit.class.push({
            value: $scope.fruit.newClass,
            isSelected: false
        })
        $scope.fruit.newClass = ''
    }
    $scope.editClass = function() {
        let selected = findSelected($scope.fruit.class)
        if (!selected) {
            alert('选择项目的数目有误！');
            return
        } else {
            123;
        }
    }
    $scope.disableClass = function() {
        let selected = findSelected($scope.fruit.class)
        selected.forEach(function(value) {
            123;
        })
    }
    $scope.fruit = {
        class: [{
            value: 1,
            isSelected: false
        }, {
            value: 2,
            isSelected: false
        }, {
            value: 3,
            isSelected: false
        }, {
            value: 3,
            isSelected: false
        }, {
            value: 3,
            isSelected: false
        }, {
            value: 4,
            isSelected: false
        }]
    }
})
