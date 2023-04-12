const React = require("react");
const {useState, useEffect} = require("react");
const {Routes, Route} = require("react-router-dom");
const turf = require('@turf/turf');
const Ctx = require("./Ctx.js");
const Home = require("./pages/Home.jsx");
const Admin = require("./pages/Admin.jsx");
const setSources = require("./functions/setSources");

module.exports = () => {
    const path = "http://localhost:3000/";
    // const path = "/";
    const [map, setMap] = useState(null);
    const [div, setDiv] = useState(null);
    const [types, setTypes] = useState(null);
    const [mapData, setMapData] = useState({});
    const [dataChange, setDataChange] = useState(false);
    const [round, setRound] = useState(true);
    const [src, setSrc] = useState({});
    const [srcUpd, setSrcUpd] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    useEffect(() => {
        if (!types) {
            fetch(`${path}api/types`)
                .then(res => res.json())
                .then(tp => {
                    setTypes(tp);
                    tp.forEach(d => {
                        fetch(`${path}api/divisions/show/${d}`)
                            .then(res => res.json())
                            .then(data => {
                                setMapData(prev => {
                                    prev[d] = [...data];
                                    return prev;
                                });
                                setDataChange(true);
                            })
                    })
                })
        }
    }, [types])
    useEffect(() => {
        if (dataChange) {
            console.log("change Data")
            console.log(mapData);
            for (let k in mapData) {
                setSrc(prev => {
                    prev[k] = {
                        type: "FeatureCollection",
                        name: k,
                        features: mapData[k].reduce((data, d) => {
                            data.push({
                                type:"Feature",
                                properties:{
                                    name: d.name,
                                    id: d._id,
                                    population: d.population,
                                    timezone: d.timezone,
                                    description: d.description
                                },
                                geometry: {
                                    type: "MultiPolygon",
                                    coordinates: d.coordinates
                                }
                            })
                            data.push({
                                ...turf.center(turf.multiPolygon(d.coordinates)),
                                properties:{
                                    name: d.name,
                                    id: "lbl-" + d._id,
                                }
                            })
                            if (d.name === "Дальневосточный федеральный округ" || d.name === "MSK+11") {
                                data[data.length - 1].geometry.coordinates = [165.7, 66.1]
                            }
                            return data;
                        }, [])
                    }
                    return prev;
                })
            }
            setSrcUpd(true)
            setDataChange(false);
        }
    }, [dataChange])
    useEffect(() => {
        if (srcUpd) {
            console.log(src);
            if (Object.keys(src).length && map) {
                setSources(map, src);
                setSrcUpd(false);
            }
        }
        if (map && Object.keys(src).length) {
            map.on("load", () => {
                setSources(map, src);
            });
        }
    }, [srcUpd, map])
    return <>
        <Ctx.Provider value={{
            path,
            map,
            setMap,
            divisions: div,
            setDivisions: setDiv,
            types,
            setTypes,
            mapData,
            setMapData,
            dataChange,
            setDataChange,
            round,
            setRound,
            src,
            srcUpd,
            setSrcUpd,
            menuActive,
            setMenuActive
        }}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
        </Ctx.Provider>
    </>
}