var map = new ol.Map({
  controls: ol.control.defaults({
    attributionOptions: {
      // FIXME: https://github.com/openlayers/ol3/issues/682
      target: document.getElementById('ol-attribution')
    }
  }, [
    new ol.control.ScaleLine({
      target: document.getElementById('ol-scale-line'),
      units: ol.control.ScaleLineUnits.METRIC
    })
  ]),
  layers: [
    new ol.layer.TileLayer({
      source: new ol.source.Stamen({
        layer: 'watercolor'
      })
    }),
    new ol.layer.TileLayer({
      source: new ol.source.Stamen({
        layer: 'terrain-labels'
      })
    })
  ],
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 2
  })
});
