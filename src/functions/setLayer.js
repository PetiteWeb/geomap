const mapboxgl = require("!mapbox-gl");
const getRand = () => Math.floor(Math.random() * 256);
const turf = require('@turf/turf');
module.exports = (active, map, source, type, paint) => {
    if (active) {
        if (map.getSource(source) && !map.getLayer(source)) {
            map.addLayer({
                "id": source,
                "type": type,
                "source": source,
                "paint": paint,
                'filter': ['==', '$type', 'Polygon']
            });
            if (source !== "country" && !map.getLayer(`${source}-hl`)) {
                map.addLayer(
                    {
                        'id': `${source}-hl`,
                        'type': 'fill',
                        'source': source,
                        'paint': {
                            'fill-color': '#E35656',
                            'fill-opacity': 0.5
                        },
                        'filter': ['in', 'name', '']
                    }
                );
                map.on('click', source, (e) => {
                    const bb = [
                        [e.point.x - 5, e.point.y - 5],
                        [e.point.x + 5, e.point.y + 5]
                    ];
                    const selectedFeatures = map.queryRenderedFeatures(bb, {
                        layers: [source]
                    });
                    const fips = selectedFeatures.map(
                        (feature) => feature.properties.name
                    );
                    map.setFilter(`${source}-hl`, ['in', 'name', ...fips]);
                    let bbox = turf.bbox(e.features[0]);
                    map.fitBounds(bbox, {
                        padding: {top: 0, bottom: 0, left: 0, right: 0}
                    });
                });
                if (source !== "country" && !map.getLayer(source + "-lbl")) {
                    map.addLayer({
                        "id": source + "-lbl",
                        "type": "symbol",
                        "source": source,
                        'filter': ['==', '$type', 'Point'],
                        "layout": {
                            'text-field': "{name}",
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold']
                        }
                    });
                }
                map.on('mouseenter', source, () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                map.on('mouseleave', source, () => {
                    map.getCanvas().style.cursor = '';
                });
            }
        }
    } else {
        if (map.getSource(source)) {
            if (map.getLayer(source)) {
                map.removeLayer(source);
            }
            if (map.getLayer(source + "-lbl")) {
                map.removeLayer(source + "-lbl");
            }
            if (map.getLayer(`${source}-hl`)) {
                map.removeLayer(`${source}-hl`)
            }
        }
    }
}