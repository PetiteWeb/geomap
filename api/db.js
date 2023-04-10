const db = require("mongoose");

const userName = process.env.DBUSER;
const userPass = process.env.DBPWD;
const dbHost = process.env.DBHOST;
const dbPort = process.env.DBPORT;
const dbName = process.env.DBNAME;

const url = `mongodb://${userName}:${userPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin&retryWrites=true&w=majority`;

db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = db;
