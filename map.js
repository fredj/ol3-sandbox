var map = new ol.Map({
  controls: ol.control.defaults({
    attributionOptions: {
      target: document.getElementById('ol-attribution')
    }
  }),
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
