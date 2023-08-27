const token = require("jsonwebtoken");
const AllModels = require("../models/AllModels");

const TakeProfileInformation = (req, res) => {
  try {
    const cookies = req.cookies.Acess_token;

    if (!cookies) {
      return res
        .status(404)
        .json({ message: "Faça Login Para executar tal ação" });
    }

    token.verify(cookies, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const AlunoInformation = await AllModels.AlunoModel.findOne({
        where: { id: aluno.id },
      });

      res.status(200).json(AlunoInformation);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const UpdateAlunoProfile = (req, res) => {
  try {
    const cookies = req.cookies.Acess_token;

    if (!cookies) {
      return res
        .status(404)
        .json({ message: "Faça Login Para executar tal ação" });
    }

    token.verify(cookies, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const UpdateAluno = await AllModels.AlunoModel.update(
        {
          nome: req.body.nome,
          sobrenome: req.body.sobrenome,
          sala: req.body.sala,
        },
        {
          where: { id: aluno.id },
        }
      );

      res.status(200).json(UpdateAluno);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const DeleteAlunoProfile = async (req, res) => {
  try {
    const cookies = req.cookies.Acess_token;

    if (!cookies) {
      return res
        .status(404)
        .json({ message: "Faça login para executar tal ação" });
    }

    token.verify(cookies, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const DeleteAluno = await AllModels.AlunoModel.destroy({
        where: { id: aluno.id },
      });

      return res.status(200).json(DeleteAluno);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const TakeSalasAluno = async (req, res) => {
  try {
    const cookies = req.cookies.Acess_token;

    if (!cookies) {
      return res
        .status(404)
        .json({ message: "Faça Login Para executar tal ação" });
    }

    token.verify(cookies, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const FindALunoSalas = await AllModels.EnterinSala.findOne({
        where: { alunoid: aluno.id },
        include: [
          {
            model: AllModels.SalaModel,
            attributes: ["nome", "descricao", "foto"],
          },
        ],
      });

      return res.status(200).json(FindALunoSalas);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const TakeALunoDocuments = (req, res) => {
  try {
    const cookies = req.cookies.Acess_token;

    if (!cookies) {
      return res
        .status(404)
        .json({ message: "Faça Login para executar tal ação" });
    }

    token.verify(cookies, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const TakeDocuments = await AllModels.documents.findOne({
        where: { alunoid: aluno.id },
        include: [
          {
            model: AllModels.SalaModel,
            attributes: ["nome", "descricao", "foto"],
          },
        ],
      });
      return res.status(200).json(TakeDocuments);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.TakeProfileInformation = TakeProfileInformation;
exports.UpdateAlunoProfile = UpdateAlunoProfile;
exports.DeleteAlunoProfile = DeleteAlunoProfile;
exports.TakeSalasAluno = TakeSalasAluno;
exports.TakeALunoDocuments = TakeALunoDocuments;
