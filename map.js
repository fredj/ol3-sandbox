var view = new ol.View2D({
  center: [0, 0],
  zoom: 2
});

var map = new ol.Map({
  controls: ol.control.defaults({}, [
    new ol.control.Attribution({
      target: document.getElementById('ol-attribution')
    })
  ]),
  layers: [
    new ol.layer.TileLayer({
      source: new ol.source.BingMaps({
        key: 'AlQLZ0-5yk301_ESrmNLma3LYxEKNSg7w-e_knuRfyYFtld-UFvXVs38NOulku3Q',
        style: 'Road'
      })
    })
  ],
  renderers: ol.RendererHints.createFromQueryData(),
  target: 'map',
  view: view
});
