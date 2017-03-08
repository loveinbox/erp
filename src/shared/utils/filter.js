erp

  .filter('time', function() {
  return function(time) {
    return moment(time * 1000).format('L')
  }
});
