const React = require("react");
const { useRef, useEffect, useState, useContext } = require("react");
const mapboxgl = require("!mapbox-gl");
const MapboxLanguage = require("@mapbox/mapbox-gl-language");

const setPermalink = require("../functions/setPermalink");
const setSources = require("../functions/setSources");

const Ctx = require("../Ctx");
const Header = require("../components/Header/index.jsx");
const Dashboard = require("../components/Dashboard/index.jsx");
const Aside = require("../components/Left/index.jsx");

mapboxgl.accessToken = "pk.eyJ1IjoibGVrc280a2EiLCJhIjoiY2xlYnRqemppMDMycDN3bXRrMnhtOXBzaiJ9.FkORLNVUiV8psYWfS2hcUw";
module.exports = () => {
    const {map, setMap, src, srcUpd, setSrcUpd} = useContext(Ctx);
    const mapContainer = useRef(null);
    const target = useRef(null);
    let language = new MapboxLanguage({defaultLanguage: "ru"});
    const [lng, setLng] = useState(92.28191);
    const [lat, setLat] = useState(70.10023);
    const [zoom, setZoom] = useState(2);


    useEffect(() => {
        if (target.current) return; // initialize map only once
        target.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            projection: 'mercator'
        });
        target.current.addControl(language);
        let hash = location.hash.split("#")[1];
        let c = [];
        let z = 10;
        if (hash && hash.split(",")) {
            c = [hash.split(",")[0], hash.split(",")[1]];
            z = hash.split(",")[2];
        } else {
            c = [target.current.getCenter().lng, target.current.getCenter().lat];
            z = target.current.getZoom();
        }
        setPermalink(target.current, c, z, true);
        // target.current.on("load", function() {
        //     setSources(target.current, src);
        // });
        // target.current.on("style.load", function() {
        //     setSources(target.current, src);
        // });
        setMap(target.current)
    });
    // useEffect(() => {
    //     if (Object.keys(src).length && map) {
    //         map.on("load", () => {
    //             console.log("check");
    //             setSources(map, src);
    //         });
    //     }
    // }, [map, srcUpd])
    return <>
        <Header/>
        <Dashboard/>
        <Aside/>
        <div ref={mapContainer} className="map-container" />
    </>
}