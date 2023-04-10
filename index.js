require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(express.static("./dist"));
app.use(cors())
app.use("/api", require("./api/routes"));
app.listen(PORT);
