module.exports = (map, data) => {
    for (let src in data) {
        if (map.getLayer(src)) {
            map.removeLayer(src);
        }
        if (map.getLayer(src+"-hl")) {
            map.removeLayer(src+"-hl");
        }
        if (map.getLayer(src+"-lbl")) {
            map.removeLayer(src+"-lbl");
        }
        if (map.getSource(src)) {
            map.removeSource(src);
        }
        map.addSource(src, {
            type: 'geojson',
            data: data[src]
        });
    }
    map.on("styledataloading", () => {
        console.log("bbbb");
        const waiting = () => {
            if (!map.isStyleLoaded()) {
                setTimeout(waiting, 200);
            } else {
                for (let src in data) {
                    // if (map.getLayer(src)) {
                    //     map.removeLayer(src);
                    // }
                    // if (map.getLayer(src+"-hl")) {
                    //     map.removeLayer(src+"-hl");
                    // }
                    // if (map.getSource(src)) {
                    //     map.removeSource(src);
                    // }
                    if (!map.getSource(src)) {
                        map.addSource(src, {
                            type: 'geojson',
                            data: data[src]
                        });
                    }
                }
            }
        };
        waiting();
    })
}