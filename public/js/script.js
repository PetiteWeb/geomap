// const key = '71hxVyyr9sBdVKFsktTj';
// const map = L.map('map').setView([0, 0], 1);
// const gl = L.maplibreGL({
//     attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
//     style: `https://api.maptiler.com/maps/c5e1c4b3-fe5c-4ee5-8cde-5c7304ad5a26/style.json?key=${key}`
// }).addTo(map);
//
// var circle = L.circle([44.056287, -123.07572], 25000, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5
// }).addTo(map);
mapboxgl.accessToken = "pk.eyJ1IjoibGVrc280a2EiLCJhIjoiY2xlYnRqemppMDMycDN3bXRrMnhtOXBzaiJ9.FkORLNVUiV8psYWfS2hcUw";
const map = new mapboxgl.Map({
    container: "map",
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [92.28191, 70.10023],
    zoom: 2
});
let language = new MapboxLanguage({defaultLanguage: "ru"});
map.addControl(language);
let hash = location.hash.split("#")[1];
let c = [];
let z = 10;
if (hash && hash.split(",")) {
    c = [hash.split(",")[0], hash.split(",")[1]];
    z = hash.split(",")[2];
} else {
    c = [map.getCenter().lng, map.getCenter().lat];
    z = map.getZoom();
}
setPermalink(map, c, z, true);
let hoveredStateId = null;
map.on("load", function() {
    map.addSource('rf', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {},
                "geometry": rf
            }]
        }
    });
    map.addSource("reg", {
        type: 'geojson',
        data: reg
    })
    map.addLayer({
        "id": "rf",
        "type": "line",
        "source": "rf",
        // "minzoom": 10,
        // "maxzoom": 22,
        "paint": {
            "line-color": "#e254bd",
            "line-opacity": 1,
            "line-width": 5
        }
    });
    map.addLayer({
        'id': 'reg',
        'type': 'fill',
        'source': 'reg',
        'layout': {},
        'paint': {
            'fill-color': '#627BC1',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
            ]
        }
    });
    map.addLayer({
        "id": "reg-stroke",
        "type": "line",
        "source": "reg",
        // "minzoom": 10,
        // "maxzoom": 22,
        "paint": {
            "line-color": "#5660bc",
            "line-opacity": 1,
            "line-width": 2
        }
    });
    map.on('mousemove', 'reg', (e) => {
        if (e.features.length > 0) {
            if (hoveredStateId !== null) {
                map.setFeatureState(
                    { source: 'reg', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
                { source: 'reg', id: hoveredStateId },
                { hover: true }
            );
        }
    });
    map.on('mouseleave', 'reg', () => {
        if (hoveredStateId !== null) {
            map.setFeatureState(
                { source: 'reg', id: hoveredStateId },
                { hover: false }
            );
        }
        hoveredStateId = null;
    });
    /*
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'reg', (e) => {
// Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

// Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description || "Hey!";

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        console.log(coordinates)
// Populate the popup and set its coordinates
// based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'reg', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    */
})
