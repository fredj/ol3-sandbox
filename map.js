app.directive('olMap', ['$parse', function($parse) {
 return {
   restrict: 'A',
   link: function(scope, element, attrs) {
     var map = $parse(attrs.olMap)(scope);
     map.setTarget(element[0]);
   }
 };
}]);
