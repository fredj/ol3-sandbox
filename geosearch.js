app.directive('olSearch', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

     var map = $parse(attrs.olSearchMap)(scope);

     element.typeahead([{
       name: 'geonames',
       header: '<strong>geonames:</strong>',
       valueKey: 'name',
       template: function(context) {
         return '<div>' + context.name + '<small class="pull-right">(' +
             context.countryName + ')</small></div>';
       },
       remote: {
         url: 'http://api.geonames.org/searchJSON?username=fredj&q=%QUERY',
         filter: function(response) {
           return response.geonames;
         }
       }
     }, {
       name: 'swisssearch',
       header: '<strong>swisssearch:</strong>',
       valueKey: 'label',
       template: function(context) {
         return '<div>' + context.name + '<small class="pull-right">(' +
             context.service + ')</small></div>';
       },
       remote: {
         url: 'http://api.geo.admin.ch/main/wsgi/swisssearch/geocoding?query=%QUERY',
         filter: function(response) {
           return $.map(response.results, function(val) {
             val.label = val.label.replace('<b>', '').replace('</b>', '');
             return val;
           });
         }
       }
     }]).on('typeahead:selected', function(event, datum) {
       // FIXME: the selected lon/lat should be placed on the scope,
       // and data binding should be used to change the map view when
       // lon and lat change on the scope.
       if (datum.lng && datum.lat) {
         // from geonames
         var center = ol.projection.transform([datum.lng, datum.lat], 'EPSG:4326', 'EPSG:3857');
         map.getView().setCenter(center);
       } else {
         // from swisssearch
         //FIXME
       }
     });

    }
  };
}]);
