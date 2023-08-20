const express = require("express");
const app = express();
const cors = require("cors");
const CookieParser = require("cookie-parser");
require("dotenv").config();
const RouteAuthAluno = require("./routes/AuthRoute");


app.use(express.json());
app.use(cors());
app.use(CookieParser());

app.use("/auth", RouteAuthAluno);





app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor Rodando Na Porta ${process.env.PORT || 3000}`);
  });
  

module.exports = app