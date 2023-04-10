const React = require("react");
const {Link} = require("react-router-dom")
const {Gear} = require("react-bootstrap-icons")
require("./style.css");
module.exports = () => {
    return <header>
        <h1>
            <Link to="/">Russian Interactive Map</Link>
        </h1>
        <Link to="/admin">
            <Gear/>
        </Link>
    </header>
}