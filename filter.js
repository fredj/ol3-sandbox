(function() {
  var filterModule = angular.module('app.filter', []);

  filterModule.filter('transformCoord', function() {
    return function(coord, from, to) {
      if (coord) {
        return ol.projection.transform(coord, from, to);
      }
    };
  });

})();
