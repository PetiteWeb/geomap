const db = require("mongoose");
const dbHost = process.env.DBHOST;
const dbPort = process.env.DBPORT;
const dbName = process.env.DBNAME;
const url = `mongodb://${dbHost}:${dbPort}/${dbName}?authSource=admin&retryWrites=true&w=majority`;

db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = db;
