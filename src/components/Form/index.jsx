const React = require("react");
const Ctx = require("../../Ctx");
const {useState, useContext} = require("react");
require("./style.css");
module.exports = () => {
    const {types, setTypes, setMapData, setDataChange, path} = useContext(Ctx);
    const [name, setName] = useState("");
    const [type, setType] = useState(types?.[types.length-1] || "");
    const [altType, setAltType] = useState("");
    const [timezone, setTimezone] = useState("-");
    const [population, setPopulation] = useState("");
    const [description, setDescription] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const clearForm = () => {
        setName("");
        setCoordinates("");
        setType(types?.[0] || "");
        setAltType("")
        setTimezone("-");
        setPopulation("");
        setDescription("");
    }
    const addHandler = (e) => {
        e.preventDefault()
        const body = {
            name: name,
            type: type === "Другое" ? altType : type,
            population: population,
            description: description
        }
        if (timezone !== "-") {
            body.timezone = timezone;
        }
        let coord = coordinates;
        try {
            coord = JSON.parse(coord);
            body.coordinates = coord;
            fetch(`${path}api/divisions/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message === "ok") {
                        clearForm();
                        setMapData(prev => {
                            if (!prev[body.type]) {
                                prev[body.type] = [];
                                setTypes(prev => [...prev, body.type])
                            }
                            prev[body.type].push(body);
                            return prev;
                        });
                        setDataChange(true)
                    } else {
                        alert(JSON.stringify(data))
                    }
                })
        } catch(err) {
            alert("Неверные координаты")
            body.coordinates = [];
        }
    }
    return <form onSubmit={addHandler}>
        <div className="form__row">
            <label htmlFor="i1">Название <span>*</span></label>
            <input type="text" id="i1" required value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className="form__row">
            <label htmlFor="i2">Тип локации <span>*</span></label>
            <select id="i2" required value={type} onChange={e => setType(e.target.value)}>
                {types?.map(t =>
                    <option key={t}>{t}</option>
                )}
                <option>Другое</option>
            </select>
            {type === "Другое" &&
                <input type="text" id="i2" required value={altType}  placeholder="Строчные латинские буквы" onChange={e => setAltType(e.target.value)}/>
            }
        </div>
        <div className="form__row">
            <label htmlFor="i3">Часовой пояс</label>
            <select id="i3" value={timezone} onChange={e => setTimezone(e.target.value)}>
                <option>-</option>
                <option>UTC2</option>
                <option>UTC3</option>
                <option>UTC4</option>
                <option>UTC5</option>
                <option>UTC6</option>
                <option>UTC7</option>
                <option>UTC8</option>
                <option>UTC9</option>
                <option>UTC10</option>
                <option>UTC11</option>
                <option>UTC12</option>
                <option>UTC13</option>
            </select>
        </div>
        <div className="form__row">
            <label htmlFor="i4">Население</label>
            <input type="number" id="i4" value={population} onChange={e => setPopulation(e.target.value)}/>
        </div>
        <div className="form__row">
            <label htmlFor="i5">Описание</label>
            <textarea id="i5" value={description} onChange={e => setDescription(e.target.value)}/>
        </div>
        <div className="form__row big">
            <label htmlFor="i6">Координаты <span>*</span></label>
            <textarea className="coordinates" id="i6" required value={coordinates} onChange={e => setCoordinates(e.target.value)}/>
        </div>
        <div className="form__row submit">
            <button type="submit">Добавить</button>
        </div>
    </form>
}