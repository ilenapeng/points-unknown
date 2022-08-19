mapboxgl.accessToken = 'pk.eyJ1IjoiaWxlbmFwIiwiYSI6ImNsNzB0a3p4cTBocDgzcHBiNHZjeXlvcnoifQ.awTvOy9l9w5PA_LxW45ARA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilenap/cl70thw5w000i14nu5627zxkn',
    zoom: 6.5,
    maxZoom: 12,
    minZoom: 6.5,
    center: [-73.949, 40.752],
    maxBounds: [
      // Southwest
      [-78.570198, 38.706095],
      // Northeast
      [-68.626003, 42.456842]
    ],
    projection: {
      'name': 'albers',       
      center: [-73.949, 40.752],
      parallels: [30, 40]}
});

map.on("load", function () {
map.addLayer(
  {
    id: "counties_outline",
    type: "line",
    // minzoom: 4,
    source: {
      type: "geojson",
      data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/ny-metro-area-commutes/ny-area-commute-duration-2020.geojson",
    },
    paint: {
      "line-color": "#F7C384",
      "line-width": 0.01,
    },
  },
  "waterway" // Here's where we tell Mapbox where to slot this new layer
);

map.addLayer(
{
id: "counties_fill",
type: "fill",
// minzoom: 4,
source: {
  type: "geojson",
  data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/ny-metro-area-commutes/ny-area-commute-duration-2020.geojson",
},
// maxzoom: 6,
paint: {
  "fill-color": 
  [
    "match",
    ["get", "plurality_time"],
    "<5",
    "#83D0CB",
    "#5 to 9",
    "#79C4C2",
    "10 to 14",
    "#6FB8BA",
    "15 to 19",
    "#65ADB1",
    "20 to 24",
    "#5BA1A8",
    "25 to 29",
    "#4C8F9B",
    "30 to 34",
    "#428392",
    "35 to 39",
    "#377688",
    "40 to 44",
    "#2C697F",
    "45 to 59",
    "#215C75",
    "60 to 89",
    "#164F6C",
    ">90",
    "#0B4262",
    "#ffffff",
  ],
  // "fill-opacity": 0.5,
  "fill-outline-color": "#ffffff",
},
},
"building" // Here's where we tell Mapbox where to slot this new layer
);

});   

// Create the county popup
map.on('click', 'counties_fill', function (e) {
  var countyName = e.features[0].properties.NAME;
  var pluralityCategory = e.features[0].properties.plurality_time;
  var pluralityPct = e.features[0].properties.plurality_time_pct.toFixed(2);
  var Pct_5 = e.features[0].properties.pct_less_5.toFixed(2);
  var Pct5_9 = e.features[0].properties.pct_5_to_9.toFixed(2);
  var Pct10_14 = e.features[0].properties.pct_10_to_14.toFixed(2);
  var Pct15_19 = e.features[0].properties.pct_15_to_19.toFixed(2);
  var Pct20_24 = e.features[0].properties.pct_20_to_24.toFixed(2);
  var Pct25_29 = e.features[0].properties.pct_25_to_29.toFixed(2);
  var Pct30_34 = e.features[0].properties.pct_30_to_34.toFixed(2);
  var Pct35_39 = e.features[0].properties.pct_35_to_39.toFixed(2);
  var Pct40_44 = e.features[0].properties.pct_40_to_44.toFixed(2);
  var Pct45_59 = e.features[0].properties.pct_45_to_59.toFixed(2);
  var Pct60_89 = e.features[0].properties.pct_60_to_89.toFixed(2);
  var Pct_90 = e.features[0].properties.pct_over_90.toFixed(2);
  
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        '<h4>' + pluralityCategory + ' minutes is the most common duration for a commute in <b>' 
        + countyName + ' County</b>, as experienced by ' + pluralityPct + "% of the county's residents.</h4>" +
        '<hr> <div class="grid"> <div class="column">' +
        '<p><5 minutes: ' + Pct_5 + '%</p>' +
        '<p>5-9 minutes: ' + Pct5_9 + '%</p>' +
        '<p>10-14 minutes: ' + Pct10_14 + '%</p>' +
        '<p>15-19 minutes: ' + Pct15_19 + '%</p>' +
        '<p>20-24 minutes: ' + Pct20_24 + '%</p>' +
        '<p>25-29 minutes: ' + Pct25_29 + '%</p> </div> <div class="column">' +
        '<p>30-34 minutes: ' + Pct30_34 + '%</p>' +
        '<p>35-39 minutes: ' + Pct35_39 + '%</p>' +
        '<p>40-44 minutes: ' + Pct40_44 + '%</p>' +
        '<p>45-59 minutes: ' + Pct45_59 + '%</p>' +
        '<p>60-89 minutes: ' + Pct60_89 + '%</p>' +
        '<p>>90 minutes: ' + Pct_90 + '%</p> </div></div>'

        // alternative version
        // '<h4> A relative majority (' + pluralityPct + '%) of residents in <b>' + countyName + ' County </b> reported a ' +
        // pluralityCategory + ' minute commute.' 
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