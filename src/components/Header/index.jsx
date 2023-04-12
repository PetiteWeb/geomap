const React = require("react");
const {useContext} = require("react");
const {Link} = require("react-router-dom");
const {Gear, List} = require("react-bootstrap-icons");
const Ctx = require("../../Ctx");
const Logo = require("../Logo");
require("./style.css");
module.exports = () => {
    const {menuActive, setMenuActive, src} = useContext(Ctx);
    return <header>
        <div
            className="header-item"
            onClick={() => setMenuActive(!menuActive)}
            style={{color: menuActive ? "var(--color-dark)" : ""}}
        >
            <List/>
        </div>
        <Logo/>
        <Link to="/admin" className="header-item">
            <Gear/>
        </Link>
    </header>
}