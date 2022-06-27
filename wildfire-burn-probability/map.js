mapboxgl.accessToken = 'pk.eyJ1IjoiaWxlbmFwIiwiYSI6ImNsNHJ3Y29neDBvZXczY3FuaTV6MzZhd3UifQ.CsJsLWf8D05UDlVJrmS9CA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilenap/cl4t1vo0r001u14lapbt1ic5u',
    zoom: 3,
    maxZoom: 6,
    minZoom: 3,
    center: [-98.5795, 37.2283],
    maxBounds: [
      // Southwest
      [-151.762363, 24.056797],
      // Northeast
      [-47.844421, 50.934196]
    ],
});

map.on("load", function () {
    map.addLayer(
        {
          id: "states_outline",
          type: "line",
          maxzoom: 4,
          source: {
            type: "geojson",
            data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/wildfire-burn-probability/burn-probability-states.geojson",
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
      maxzoom: 4,
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/wildfire-burn-probability/burn-probability-states.geojson",
      },
      // maxzoom: 6,
      paint: {
        "fill-color": [
          "match",
          ["get", "naturalBreaks"],
          "0.01 - 0.3",
          // original color F7B267
          "#F7C384",
          "0.3 - 0.75",
          "#F79D65",
          "0.75 - 1.47",
          "#F4845F",
          "1.47 - 2.25",
          "#F27059",
          "2.25 - 2.95",
          // original F25C54
          "#F14A41",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
      },
    },
    "states_outline" // Here's where we tell Mapbox where to slot this new layer
  );

  map.addLayer(
    {
      id: "counties_outline",
      type: "line",
      minzoom: 4,
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/wildfire-burn-probability/burn-probability-counties.geojson",
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
  id: "counties_fill",
  type: "fill",
  minzoom: 4,
  source: {
    type: "geojson",
    data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/wildfire-burn-probability/burn-probability-counties.geojson",
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

// text legend
const zoomThreshold = 4;
const stateLegendEl = document.getElementById('state-legend');
const countyLegendEl = document.getElementById('county-legend');
map.on('zoom', () => {
if (map.getZoom() > zoomThreshold) {
stateLegendEl.style.display = 'none';
countyLegendEl.style.display = 'block';
} else {
stateLegendEl.style.display = 'block';
countyLegendEl.style.display = 'none';
}
});

// create state legend
const layers = [
  "0.01 - 0.3",
  "0.3 - 0.75",
  "0.75 - 1.47",
  "1.47 - 2.25",
  "2.25 - 2.95"
];
const colors = [
  "#F7C384",
  "#F79D65",
  "#F4845F",
  "#F27059",
  "#F14A41",
];
      
const legend = document.getElementById('state-legend');

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

// county legend

const layersCounty = [
  "0.0 - 0.81",
  "0.81 - 2.63",
  "2.63 - 5.49",
  "5.49 - 9.51",
  "9.51 - 17.12"
];
const colorsCounty = [
"#F7C384",
"#F79D65",
"#F4845F",
"#F27059",
"#F14A41",
];
    
// create legend
const legend2 = document.getElementById('county-legend');

layersCounty.forEach((layer, i) => {
const color2 = colorsCounty[i];
const item2 = document.createElement('div');
const key2 = document.createElement('span');
key2.className = 'legend-key';
key2.style.backgroundColor = color2;

const value2 = document.createElement('span');
value2.innerHTML = `${layer}`;
item2.appendChild(key2);
item2.appendChild(value2);
legend2.appendChild(item2);
});

// Create the state popup
map.on('click', 'states_fill', function (e) {
  // var countyName = e.features[0].properties.NAMELSAD;
  var stateName = e.features[0].properties.STATE;
  var bpRatio = e.features[0].properties.BP_ratio.toFixed(2);
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        '<h4>The annual average chance of a pixel in ' +
        '<b>' + stateName + '</b>' + ' burning was ' +
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

// Create the county popup
map.on('click', 'counties_fill', function (e) {
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
map.on('mouseenter', 'counties_fill', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'counties_fill', function () {
    map.getCanvas().style.cursor = '';
});