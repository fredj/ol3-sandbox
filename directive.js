(function() {
  var directiveModule = angular.module('app.directive', []);

  /**
   * Define the app-map directive.
   */
  directiveModule.directive('appMap', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var map = $parse(attrs.appMap)(scope);
        map.setTarget(element[0]);

        if (attrs.appMapViewCenter) {
          var view = map.getView();

          // Binding map -> scope
          //
          // Note: we don't set the "map -> scope" binding if the expression is
          // not assignable.
          var setter = $parse(attrs.appMapViewCenter).assign;
          if (setter) {
            view.on('center_changed', function() {
              var center = view.getCenter();
              setter(scope, center);
            });
          }

          // Binding scope -> map
          scope.$watch(attrs.appMapViewCenter, function(value) {
            if (value) {
              view.setCenter(value);
            }
          }, true);
        }
      }
    };
  }]);

  /**
   * Define the app-search directive.
   */
  directiveModule.directive('appSearch', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        var searchResultExpr = attrs.appSearchResult;
        if (!searchResultExpr) {
          throw new Error('No search-result attr for app-search');
        }

        // Attach the typeahead to the element.
        var typeahead = element.typeahead([{
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
            return '<div>' + context.label + '<small class="pull-right">(' +
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
        }, {
          name: 'layers',
          header: '<strong>swisstopo layers:</strong>',
          valueKey: 'kurzbezeichnung',
          template: function(context) {
            return '<div><i class="icon-plus-sign"></i> Add <strong>' + context.kurzbezeichnung + '</strong> layer to the map </div>';
          },
          remote: {
            url: 'http://api.geo.admin.ch/main/wsgi/layers?query=%QUERY',
            filter: function(response) {
              return response.results;
            }
          }
        }]);

        // Detect selection and set the selected lon,lat on the scope.
        var searchResultSetter = $parse(searchResultExpr).assign;
        typeahead.on('typeahead:selected', function(event, datum) {
          if (datum.lng && datum.lat) {
            // from geonames
            scope.$apply(function() {
              searchResultSetter(scope, [datum.lng, datum.lat]);
            });
          } else {
            // from swisssearch
            //FIXME
          }
        });

      }
    };
  }]);

})();
