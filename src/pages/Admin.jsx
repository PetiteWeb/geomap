const React = require("react");
const {Link} = require("react-router-dom");
const {useState} = require("react");
const Form = require("../components/Form")
const Table = require("../components/Table")
module.exports = () => {
    const tabs = ["Вся информация", "Добавить данные"]
    const [actTab, setActTab] = useState(tabs[0])
    return <>
        <div className="admin">
            <header className="admin__header">
                <h1>
                    <Link to="/">Russian Interactive Map</Link>
                </h1>
            </header>
            <nav className="admin__nav">
                <ul>
                    {tabs.map((t) => <li key={t} className={actTab === t ? "active" : ""} onClick={() => setActTab(t)}>{t}</li>)}
                </ul>
            </nav>
            <div className="admin__container">
                {actTab === tabs[0] &&
                    <div>
                        <h2>База данных</h2>
                        <Table/>
                    </div>
                }
                {actTab === tabs[1] &&
                    <div>
                        <h2>Добавить регион</h2>
                        <Form/>
                    </div>
                }
            </div>
        </div>
    </>
}