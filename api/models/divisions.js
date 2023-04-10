const db = require("../db");

const DivSchema = new db.Schema({
    name: String,
    type: String,
    timezone: String,
    population: Number,
    description: String,
    coordinates: [Array]
});

const Division = db.model("divisions", DivSchema);
module.exports = Division;