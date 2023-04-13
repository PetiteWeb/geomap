const React = require("react");
const {useState, useContext} = require("react");
const {useNavigate} = require("react-router-dom")
const {Trash, Gear} = require("react-bootstrap-icons")
const Ctx = require("../../Ctx")
require("./style.css");

module.exports = () => {
    const {mapData, setMapData, setTypes, path, setDataChange} = useContext(Ctx);
    const navigate = useNavigate();
    const delHandler = (id, name, type) => {
        let agree = confirm(`Вы точно хотите удалить из БД информацию о ${name}?`);
        if (agree) {
            fetch(`${path}api/divisions/delete/${id}`, {
                method: "delete"
            })
                .then(res => {
                    if (res.ok) {
                        setTypes(prev => prev.filter(t => t !== type));
                        setMapData(prev => {
                            let newData = {...prev};
                            delete newData[type];
                            return newData;
                        });
                        setDataChange(true);
                    }
                })
        }
    }
    return <div className="table">
        <div className="table__title">Название</div>
        <div className="table__title">Численность населения</div>
        <div className="table__title">Часовой пояс</div>
        <div className="table__title">Описание</div>
        <div className="table__title"><Gear/></div>
        {Object.keys(mapData).map(type => <React.Fragment key={type}>
            <h3>{type}</h3>
            {mapData[type].map(row => <React.Fragment key={row._id}>
                <div>{row.name}</div>
                <div>{row.population}</div>
                <div>{row.timezone}</div>
                <div>{row.description}</div>
                <div style={{justifyContent: "center", cursor: "pointer"}} onClick={e => delHandler(row._id, row.name, row.type)}><Trash/></div>
            </React.Fragment>)}
        </React.Fragment>)}
    </div>
}