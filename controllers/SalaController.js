const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");
const AllModels = require("../models/AllModels");

const GetAllSalas = async (req, res) => {
  try {
    const q = await AllModels.SalaModel.findAll();
    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetSalaInformation = async (req, res) => {
  try {
    const Sala = await AllModels.SalaModel.findOne({
      where: { id: req.params.id },
      include: [{ model: AllModels.AlunoModel, attributes: ["nome", "foto"] }],
    });

    res.status(200).json(Sala);
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
        admid: aluno.id,
      });
      const savedsala = await Sala.save();
      return res.status(200).json(savedsala);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const EnterinSala = async (req, res) => {
  try {
    const sala = req.body.salaid;

    const cookie = req.cookies.Acess_Token;

    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça Login para executar tal ação" });
    }

    token.verify(cookie, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const EnterSala = await AllModels.EnterinSala.create({
        salaid: sala,
        userid: aluno.id,
      });

      return res.status(200).json(EnterSala);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const ExitSala = async (req, res) => {
  try {
    const sala = req.body.salaid;

    const cookie = req.cookies.Acess_Token;

    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça Login para executar tal ação" });
    }

    token.verify(cookie, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const exitSala = await AllModels.EnterinSala.destroy({
        salaid: sala,
        userid: aluno.id,
      });

      return res.status(200).json(exitSala);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetAlunosInSalas = async (req, res) => {
  try {
    const alunosalas = await AllModels.EnterinSala.findOne({
      where: { salaid: req.params.id },
      include: [
        { model: AllModels.AlunoModel, attributes: ["nome", "sobrenome"] },
      ],
    });

    return res.status(200).json(alunosalas);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.GetAllSalas = GetAllSalas;
exports.GetSalaInformation = GetSalaInformation;
exports.CreateSala = CreateSala;
exports.EnterinSala = EnterinSala;
exports.ExitSala = ExitSala;
exports.GetAlunosInSalas = GetAlunosInSalas;
