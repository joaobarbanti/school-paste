const express = require("express");
const route = express.Router();
const Controller = require("../controllers/SalaController");
const multer = require("multer");
const upload = multer({ dest: "salasfotos/" });
const upload2 = multer({ dest: "documentosarquivos/" });

route.get("/", Controller.GetAllSalas);
route.get("/:id", Controller.GetSalaInformation);
route.post("/Criar", upload.single("foto"), Controller.CreateSala);
route.delete("/Deletar/:id", Controller.DeleteSalaWhenAdm)
route.put("/Atualizar/:id", Controller.UpdateSala)
route.post("/Entrar", Controller.EnterSala);
route.post("/Sair", Controller.ExitSala);
route.get("/alunos/:id", Controller.GetAlunosInSalas);
route.post(
  "/criar/documento/:salaid",
  upload2.single("arquivo"),
  Controller.CreateDocument
);
route.get("/documentos/:salaid", Controller.TakeDocumentsInSala);
route.get("/documentos/pesquisar/:salaid", Controller.SearchDocumentsByAula)
route.delete("/documentos/:id", Controller.DeleteDocument)

module.exports = route;
