const exp = require("express");
require("dotenv").config("./.env");

const port = 3000;
const app = exp();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(exp.static("./public"));
app.use(exp.json());
app.use(exp.urlencoded({extended: true}));
app.use("/", require("./routes/index.js"));
app.use((q, s, next) => {
    const error = new Error("Page not found");
    error.status = 404;
    next(error);
});
app.use((error, q, s, next) => {
    s.status(error.status || 500);
    s.render("404", {
        status: error.status
    });
});

app.listen(port);
