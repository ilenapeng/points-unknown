mapboxgl.accessToken = 'pk.eyJ1IjoiaWxlbmFwIiwiYSI6ImNsNDh0amZtejA2Z3czam8zeW44cXVrdGMifQ.gjnayWwPGkjo5rJ6hww7Bw';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/ilenap/cl48tgv9o000q14oe0p6g8tds',
    zoom: 10.2,
    maxZoom: 15,
    minZoom: 10.2,
    center: [-73.949, 40.752]
});

map2.on("load", function () {
      let layers = map.getStyle().layers;
        for (var i=0; i<layers.length; i++) {
        console.log(layers[i].id)}

  map2.addLayer(
    {
      id: "map_points",
      type: "circle",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/citibike-data/citibikeData_09_20_ends.geojson",
      },
      paint: {
        'circle-radius': 3,
        // "circle-color": '#26547C',
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 0.5,
        "circle-opacity": 0.8,

        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'trip_count'],
          0,
          '#ffff00',
          3500,
          '#5ceb6c',
          7000,
          '#00b599',
          10500,
          '#007691',
          14000,
          '#002f61'
          ],
      },
      minzoom: 3,
    },
    "settlement-minor-label"
  );
  
});

// Create the popup
map2.on('click', 'map_points', function (e) {
  var stationName = e.features[0].properties.end_station_name;
  var tripCount = e.features[0].properties.trip_count.toLocaleString();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>' + tripCount + ' trips ended at ' + stationName + '</h2>'
          )
      .addTo(map2);
});
map2.on('mouseenter', 'map_points', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
map2.on('mouseleave', 'map_points', function () {
  map2.getCanvas().style.cursor = '';
});