mapboxgl.accessToken = 'pk.eyJ1IjoiaWxlbmFwIiwiYSI6ImNsNHJ3Y29neDBvZXczY3FuaTV6MzZhd3UifQ.CsJsLWf8D05UDlVJrmS9CA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilenap/cl4t1vo0r001u14lapbt1ic5u',
    zoom: 3.5,
    maxZoom: 6,
    minZoom: 3,
    center: [-98.5795, 37.2283]
});

map.on("load", function () {
    map.addLayer(
        {
          id: "states_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/wildfire-risk/burn-probability-counties.geojson",
          },
          paint: {
            "line-color": "#F7C384",
            "line-width": 0.01,
          },
        },
        "waterway-label" // Here's where we tell Mapbox where to slot this new layer
      );
  map.addLayer(
    {
      id: "states_fill",
      type: "fill",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/wildfire-risk/burn-probability-counties.geojson",
      },
      // maxzoom: 6,

      paint: {
        "fill-color": [
          "match",
          ["get", "naturalBreaks"],
          "0.0 - 0.81",
          // original color F7B267
          "#F7C384",
          "0.81 - 2.63",
          "#F79D65",
          "2.63 - 5.49",
          "#F4845F",
          "5.49 - 9.51",
          "#F27059",
          "9.51 - 17.12",
          // original F25C54
          "#F14A41",
          "#ffffff",
        ],
        // "fill-opacity": 0.5,
        "fill-outline-color": "#ffffff",
      },
    },
    "states_outline" // Here's where we tell Mapbox where to slot this new layer
  );
});

// text for legend

const layers = [
    "0.0 - 0.81",
    "0.81 - 2.63",
    "2.63 - 5.49",
    "5.49 - 9.51",
    "9.51 - 17.12",
];
const colors = [
  "#F7C384",
  "#F79D65",
  "#F4845F",
  "#F27059",
  "#F14A41",
];
      
// create legend
const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
});

// Create the popup
map.on('click', 'states_fill', function (e) {
    var countyName = e.features[0].properties.NAMELSAD;
    var stateName = e.features[0].properties.STATE;
    var bpRatio = e.features[0].properties.BP_ratio.toFixed(2);
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          '<h4>The annual average chance of a pixel in ' +
          '<b>' + countyName + ', ' + stateName + '</b>' + ' burning was ' +
          + bpRatio + ' out of 1,000' + '</h4>'
            )
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the states_fill layer.
map.on('mouseenter', 'states_fill', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'states_fill', function () {
    map.getCanvas().style.cursor = '';
});