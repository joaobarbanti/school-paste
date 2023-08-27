const express = require("express");
const route = express.Router();
const Controller = require("../controllers/ProfileController");

route.get("/", Controller.TakeProfileInformation);
route.put("/atualizar", Controller.UpdateAlunoProfile);
route.delete("/deletar", Controller.DeleteAlunoProfile);
route.get("/salas", Controller.TakeSalasAluno);
route.get("/documentos", Controller.TakeALunoDocuments);

module.exports = route;
