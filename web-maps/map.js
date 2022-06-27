mapboxgl.accessToken = 'pk.eyJ1IjoiaWxlbmFwIiwiYSI6ImNsM3djZGV4aTJ1OG4za2w4OGl0eWZiYXMifQ.HOrDhSR3TrF3aWi5z3UpXg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilenap/cl3wc4tk2000315p4d76trgg3',
    zoom: 3.5,
    maxZoom: 9,
    minZoom: 3,
    center: [-98.5795, 37.2283],
    maxBounds: [
      // Southwest
      [138.762363, 24.056797],
      // Northeast
      [47.844421, 50.934196]
    ],
});

map.on("load", function () {
    map.addLayer(
        {
          id: "states_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "https://raw.githubusercontent.com/browninstitute/pointsunknowndata/main/webmapAssignmentDataset/countyTypologyCodes.geojson",
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": 0.7,
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
        data: "https://raw.githubusercontent.com/browninstitute/pointsunknowndata/main/webmapAssignmentDataset/countyTypologyCodes.geojson",
      },
      maxzoom: 6,
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Farming",
          "#D8B70A",
          "Nonspecialized",
          "#A2A475",
          "Maufacturing",
          "#02401B",
          "Recreation",
          "#81A88D",
          "Federal\/State Government",
          "#972D15",
          "Mining",
          "#FAD77B",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
      },
    },
    "states_outline" // Here's where we tell Mapbox where to slot this new layer
  );
});

      // text for legend
        const layers = [
          'Farming',
          'Non-specialized',
          'Manufacturing',
          'Recreation',
          'Federal/State government',
          'Mining'
          // 'Other'
        ];
        const colors = [
          '#D8B70A',
          '#A2A475',
          '#02401B',
          '#81A88D',
          '#972D15',
          '#FAD77B'
          // '#ffffff'
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
    var countyName = e.features[0].properties.County_name;
    var stateName = e.features[0].properties.State;
    var econLabel = e.features[0].properties.Economic_Type_Label;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          '<h2>'+ countyName + ', ' + stateName +'</h2>' +
          '<h4>' + 'Economic dependence type: ' + econLabel + '</h4>'
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