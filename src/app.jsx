const ReactDOM = require("react-dom");
const React = require("react");

import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
const {BrowserRouter} = require("react-router-dom");
const Main = require("./Main.jsx");

ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>,
    document.querySelector("[data-type=\"app\"]")
)