const React = require("react");
const {Link} = require("react-router-dom")
require("./style.css");

module.exports = () => {
    return <Link to="/" className="logo">
        <div className="logo-img"/>
        <div className="logo-txt">Russian-Interactive-Map | Российская-Интерактивная-Карта</div>
    </Link>
}