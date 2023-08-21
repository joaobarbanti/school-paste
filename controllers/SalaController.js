const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");
const AllModels = require("../models/AllModels");

const GetAllSalas = async (req, res) => {
  try {
    const salas = await AllModels.SalaModel.findAll();

    return res.status(200).json(salas);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetSalaInformation = async (req, res) => {
  try {
    const Sala = await AllModels.SalaModel.findOne({
      where: { id: req.params.id },
      include: [{ model: AllModels.AlunoModel, attributes: ['nome', 'foto'] }],
    });

    res.status(200).json(Sala)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const CreateSala = async (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

    const file = req.file;
    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça Login Para executar tal ação" });
    }

    token.verify(cookie, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(404).json({ message: "Token inválido" });

      const name = await AllModels.SalaModel.findOne({
        where: { nome: req.body.nome },
      });

      if (name)
        return res.status(400).json({ message: "Nome de sala já existente" });

      const Sala = await AllModels.SalaModel.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        foto: file.path,
        admid:aluno.id
      });

      return res.status(200).json(Sala);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.GetAllSalas = GetAllSalas;
exports.GetSalaInformation = GetSalaInformation
exports.CreateSala = CreateSala;

