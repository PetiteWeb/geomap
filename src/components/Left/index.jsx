const React = require("react");
const {useContext, useState, useEffect} = require("react");
const {GlobeAmericas, Plus, Dash, PinMap} = require("react-bootstrap-icons");
const Ctx = require("../../Ctx");
require("./style.css");
const setLayer = require("../../functions/setLayer");
module.exports = () => {
    const {map, mapData, round, setRound} = useContext(Ctx);
    const [mapActive, setMapActive] = useState(false);
    const zoomPlus = () => {
        let z = map.getZoom();
        map.zoomTo(z + 1, {duration: 500, offset: [0, 0]})
    }
    const zoomMinus = () => {
        let z = map.getZoom();
        map.zoomTo(z - 1, {duration: 500})
    }
    const handler = () => {
        console.log("ddd");
        setRound(!round)
        setLayer(!round, map, "country", "line", {
            "line-color": "#9D0000",
            "line-opacity": 1,
            "line-width": 2
        });
    }
    useEffect(() => {
        console.log("eee", round);
    }, [round])
    useEffect(() => {
        if (map) {
            if (mapActive) {
                map.setStyle("mapbox://styles/mapbox/satellite-streets-v12");
            } else {
                map.setStyle("mapbox://styles/mapbox/streets-v11");
            }
        }
    }, [mapActive])
    useEffect(() => {
        if (map) {
            map.on("sourcedataloading", function() {
                setRound(round)
                if (round && map.getSource("country") && !map.getLayer("country")) {
                    setLayer(round, map, "country", "line", {
                        "line-color": "#9D0000",
                        "line-opacity": 1,
                        "line-width": 2
                    })
                }
            })
        }
    }, [map])
    return <aside>
        <button title="Показать физическую карту" onClick={() => setMapActive(!mapActive)}>
            <GlobeAmericas style={{color: mapActive ? "var(--color-dark)" : "black"}}  />
        </button>
        {mapData.country && <button title="Показать границы" onClick={handler}>
            <PinMap style={{color: round ? "var(--color-dark)" : "black"}} />
        </button>}
        <div className="btn-gr">
            <button onClick={zoomPlus}><Plus/></button>
            <hr/>
            <button onClick={zoomMinus}><Dash/></button>
        </div>
    </aside>
}