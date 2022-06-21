mapboxgl.accessToken = 'pk.eyJ1IjoiaWxlbmFwIiwiYSI6ImNsNGxpOThsdTBuazkzamwwd2VmNzg2NjgifQ.3oGPJCrho1Z1MKTmvHy8rw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilenap/cl4li7g61000514s0yzn0jfga',
    zoom: 6.5,
    maxZoom: 9,
    minZoom: 6.5,
    center: [120.949313, 23.711329],
    maxBounds: [
      // Southwest
      [115.686862, 20.310008],
      // Northeast
      [125.332857, 26.722451]
    ],
    projection: {
      name: 'albers',
      center: [120.949313, 23.711329],
      parallels: [20, 30]
  }
});

// .on "load" adds the layer AFTER the base map loads
// Colors our states gray:
map.on("load", function () {
    let layers = map.getStyle().layers;
      for (var i=0; i<layers.length; i++) {
      console.log(layers[i].id)}
    
    map.addLayer({
      id: "tw_boundaries",
      type: "fill", 
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/ilenapeng/points-unknown-data/main/taiwan-foreign-residents/tw-foreign-nationality.geojson",
      },
      paint: {
        "fill-color": [
          'interpolate',
          ['linear'],
          ['get', 'pop_difference'],
          -1500,
          '#DFA88B',
          0,
          '#F5F5F5',
          1500,
          '#80CDC1',
          3000,
          '#45B09E',
          4500,
          '#018571',
          6000,
          '#006347',
          9500,
          '#003D2C',
          13000,
          '#00291D'
          ],
        "fill-outline-color": "#999999",
        "fill-opacity": 0.6,
      },
    },
    "waterway-label"
    );
  });

  map.on('load', () => {
    map.addSource('dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1'
    });
    map.addLayer(
    {
    'id': 'hillshading',
    'source': 'dem',
    'type': 'hillshade'
    },
    'building'
    );
});

// Create the popup
map.on('click', 'tw_boundaries', function (e) {
    var localityName = e.features[0].properties.locality;
    var direction = increaseDecrease(e.features[0].properties['pop_difference']);
    // take the absolute value to remove the negative signs and then convert to locale string to get commas
    var popCount = Math.abs(e.features[0].properties.pop_difference).toLocaleString();

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          '<h2>' + localityName + '</h2>' +
          '<p>' + 'The population ' + direction + popCount + ' people' + '</p>'
          )
        .addTo(map);
});

// function for conditional popup tooltip
function increaseDecrease(d) {
  if (d > 0) {
      return "increased by "
  }
  else {
      return "decreased by "
  }
}

// Change the cursor to a pointer when the mouse is over the tw_boundaries layer.
map.on('mouseenter', 'tw_boundaries', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'tw_boundaries', function () {
    map.getCanvas().style.cursor = '';
});

      // text for legend
      const layers = [
        '-1.5K',
        '0',
        '1.5',
        '3',
        '4.5',
        '6',
        '9.5',
        '13'
        ];

        const colors = [
        '#DFA88B',
        '#F5F5F5',
        '#80CDC1',
        '#45B09E',
        '#018571',
        '#006347',
        '#003D2C',
        '#00291D'
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