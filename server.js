const express = require("express");
const app = express();
const cors = require("cors");
const CookieParser = require("cookie-parser");
require("dotenv").config();
const RouteAuthAluno = require("./routes/AuthRoute");
const RouteSalas = require("./routes/SalasRoute");
const db = require("./db");

app.use(express.json());
app.use(cors());
app.use(CookieParser());

app.use("/auth", RouteAuthAluno);
app.use("/salas", RouteSalas);


 db.sync({ force: true });


app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor Rodando Na Porta ${process.env.PORT || 3000}`);
});

module.exports = app;
