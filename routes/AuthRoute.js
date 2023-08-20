const express = require("express");
const route = express.Router();
const Controller = require("../controllers/AuthController");
const multer = require("multer");
const upload = multer({ dest: "alunosfotos/" });

route.post("/Register", upload.single("foto"), Controller.Register);
route.post("/Login", Controller.Login)


module.exports = route;
