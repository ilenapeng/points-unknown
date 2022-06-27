mapboxgl.accessToken = 'pk.eyJ1IjoiaWxlbmFwIiwiYSI6ImNsM3gzeW9nNjE5dXgzY3A0MDVwNHEyYzkifQ.0W4OUjB__JFlHmCamRVinw';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/ilenap/cl3x3f3od002a14o0zej9lb4x',
    zoom: 3.5,
    maxZoom: 9,
    minZoom: 3,
    center: [-98.5795, 37.2283],
    maxBounds: [
      // Southwest
      [-151.762363, 24.056797],
      // Northeast
      [-47.844421, 50.934196]
    ],
});

map2.on("load", function () {
      let layers = map.getStyle().layers;
        for (var i=0; i<layers.length; i++) {
        console.log(layers[i].id)}

  map2.addLayer(
    {
      id: "police_brutality_points",
      type: "circle",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/browninstitute/pointsunknowndata/main/webmapAssignmentDataset/policeBrutality.geojson",
      },
      paint: {
        'circle-radius': 6,
        "circle-color": '#26547C',
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 0.5,
        "circle-opacity": 0.5,
      },
      minzoom: 3,
    },
    "settlement-minor-label"
  );
  
});

// Create the popup
map2.on('click', 'police_brutality_points', function (e) {
  var cityName = e.features[0].properties.city;
  var stateName = e.features[0].properties.state;
  var date = e.features[0].properties.date;
  var description = e.features[0].properties.description;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>' + cityName + ', ' + stateName + '</h2>' 
      + '<h4>' + date + '</h4>' 
      + '<p>' + description + '</p>'
          )
      .addTo(map2);
});
map2.on('mouseenter', 'police_brutality_points', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
map2.on('mouseleave', 'police_brutality_points', function () {
  map2.getCanvas().style.cursor = '';
});