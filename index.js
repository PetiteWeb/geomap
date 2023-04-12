require("dotenv").config()
const express = require("express");
const compression = require('compression');
const cors = require("cors");
var path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(express.static("./dist"));
app.use(compression())
app.use(cors());
app.use("/api", require("./api/routes"));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})
app.listen(PORT);
