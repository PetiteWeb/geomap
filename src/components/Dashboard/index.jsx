const React = require("react");
const {useContext, useState, useEffect} = require("react");
const Ctx = require("../../Ctx");
const setLayer = require("../../functions/setLayer");
require("./style.css");
module.exports = () => {
    const {map, mapData, updMapData, menuActive} = useContext(Ctx);
    const [active, setActive] = useState("");
    // const [tags, setTags] = useState("")
    const tags = [
        {name: "federal_district", description: "Федеральные округа"},
        {name: "timezone", description: "Часовые пояса"},
        // {name: "m2", description: "Субъекты РФ"},
        // {name: "m3", description: "Часовые пояса", test: true},
        // {name: "m4", description: "Население"},
        // {name: "m5", description: "Минеральные ресурсы"},
        // {name: "m4", description: "Климатические пояса", test: true}
    ]
    useEffect(() => {
        if (active) {
            tags.forEach(el => {
                if (map.getLayer(el.name)) {
                    setLayer(false, map, el.name);
                }
            })
            if (map.getSource(active) && !map.getLayer(active)) {
                setLayer(true, map, active, "fill", {
                    "fill-color": "#E35656",
                    "fill-opacity": .2,
                    "fill-outline-color": "#E35656"
                });
            }
        }

    }, [active])
    useEffect(() => {
        if (map) {
            // map.on("styledataloading", function() {
            map.on("style.load", function() {
                if (active) {
                    tags.forEach(el => {
                        if (map.getLayer(el.name)) {
                            setLayer(false, map, el.name);
                        }
                    });
                    if (map.getSource(active) && !map.getLayer(active)) {
                        setLayer(true, map, active, "fill", {
                            'fill-color': "transparent",
                            "fill-opacity": 1,
                            "fill-outline-color": "#cb62cc"
                        });
                    } else {
                        setActive("");
                    }
                }
            })
            // map.on("style.load", function () {
            //     if (active) {
            //         // tags.forEach(el => {
            //         //     console.log(el);
            //         //     if (map.getLayer(el.name)) {
            //         //         setLayer(false, map, el.name);
            //         //     }
            //         // })
            //         // setLayer(true, map, active, "fill", {
            //         //     'fill-color': "transparent",
            //         //     "fill-opacity": 1,
            //         //     "fill-outline-color": "#cb62cc"
            //         // });
            //     }
            // })
        }
    })
    const handle = (e) => {
        let name = e.currentTarget.dataset.name;
        setActive(name);
    }
    return <nav className={menuActive ? "menu active" : "menu"}>
        <ul>
            {tags.map(el => mapData[el.name] && <li key={el.name} style={{color: active === el.name ? "var(--color-dark)" : "inherit"}} onClick={handle} data-name={el.name}>
                {el.description}
                {el.test && <span>В разработке</span>}
            </li>)}
        </ul>
    </nav>
}