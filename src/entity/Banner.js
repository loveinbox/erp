angular.module('erp.services')

.service('Banner', function($resource, $state, API) {
  this.name = 'Banner'
  this.query = API.banner
  this.export = API.bannerExport
  this.new = function() {
    $state.go('app.new', { type: 'banner' })
  }
  this.rowActionHandler = {
    'edit': function(rowData) {
      $state.go('app.new', { type: 'banner', id: rowData.bannerId });
    },
    'disable': function(rowData) {
      if (confirm('确定要废弃么？')) {
        return API.bannerRemove.get({
          bannerId: rowData.bannerId
        }).$promise
      }
    }
  }
  this.meta = {
    header: [{
      text: '分类位置',
      apiName: 'typeName',
      formKey: 'typeId',
      type: 'select',
      API: API.bannerType
    }, {
      text: '图片',
      apiName: 'headImg',
      type: 'imgUploadSingle',
      inputKey: 'pos'
    }, {
      text: '顺序',
      apiName: 'pos',
    }, {
      text: '链接',
      apiName: 'toUrl'
    }, {
      text: '状态',
      apiName: 'statusName',
      formKey: 'statusId',
      type: 'select',
      API: API.bannerStatus
    }],
    actions: [{
      text: '修改',
      type: 'edit'
    }, {
      text: '废弃',
      type: 'disable'
    }],
    button: {
      new: true
    }
  }

})
