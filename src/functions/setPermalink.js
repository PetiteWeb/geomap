module.exports = (map, point, zoom, f) => {
    if (f) {
        point = (point) ? point : [37.6155600, 55.7522200];
        zoom = (zoom) ? zoom : 11;
        let state = {
            "mapCenter": point,
            "mapZoom": zoom
        };
        let title = "Creating map state";
        let url = "#" +
            point[0] + ',' +
            point[1] + ',' +
            zoom;
        map.setCenter(point);
        map.setZoom(zoom);
        window.history.pushState(state, title, url);
        map.on("moveend", function () {
            let lng = Math.round(map.getCenter().lng * 100000) / 100000;
            let lat = Math.round(map.getCenter().lat * 100000) / 100000;
            point = [lng, lat];
            zoom = Math.round(map.getZoom());
            state = {
                "mapCenter": point,
                "mapZoom": zoom
            };
            url = "#" +
                point[0] + ',' +
                point[1] + ',' +
                zoom;
            title = "Changing map state";
            window.history.pushState(state, title, url);
        });
    } else {
        point = (point) ? point : [55.7522200, 37.6155600];
        zoom = (zoom) ? zoom : 11;
        let state = {
            "mapCenter": point,
            "mapZoom": zoom
        };
        let title = "Creating map state";
        let url = "#" +
            point[0] + ',' +
            point[1] + ',' +
            zoom;
        map.setView(point, zoom);
        window.history.pushState(state, title, url);
        map.on("moveend", function () {
            let lng = Math.round(map.getCenter().lng * 100000) / 100000;
            let lat = Math.round(map.getCenter().lat * 100000) / 100000;
            point = [lat, lng];
            zoom = Math.round(map.getZoom());
            state = {
                "mapCenter": point,
                "mapZoom": zoom
            };
            url = "#" +
                point[0] + ',' +
                point[1] + ',' +
                zoom;
            title = "Changing map state";
            window.history.pushState(state, title, url);
        });
    }
}