const express = require("express");
const route = express.Router();
const Controller = require("../controllers/SalaController");
const multer = require("multer");
const upload = multer({ dest: "salasfotos/" });

route.get("/", Controller.GetAllSalas);
route.get("/:id", Controller.GetSalaInformation);
route.post("/Criar", upload.single("foto"), Controller.CreateSala);
route.post("/Entrar", Controller.EnterinSala);
route.post("/Sair", Controller.ExitSala);
route.get("/alunos/:id", Controller.GetAlunosInSalas);

module.exports = route;
