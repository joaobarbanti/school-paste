const token = require("jsonwebtoken");
const AllModels = require("../models/AllModels");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

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

      const Sala = AllModels.SalaModel.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        foto: file.path,
        admid: aluno.id,
      });
      return res.status(200).json(Sala);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const DeleteSalaWhenAdm = async (req, res) => {
  try {
    const cookies = req.cookies.Acess_Token;

    if (!cookies) {
      return res
        .status(404)
        .json({ message: "Faça Login Para executar tal ação" });
    }

    token.verify(cookies, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const DeleteSala = await AllModels.SalaModel.destroy({
        where: {
          [Op.and]: [
            {
              id: { [Op.like]: req.params.id },
            },
            {
              admid: { [Op.like]: aluno.id },
            },
          ],
        },
      });

      return res.status(200).json(DeleteSala);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const UpdateSala = async (req, res) => {
  try {
    const cookies = req.cookies.Acess_Token;

    const file = req.file;

    if (!cookies) {
      return res
        .status(404)
        .json({ message: "Faça Login para Executar tal ação" });
    }

    token.verify(cookies, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const updateSala = await AllModels.SalaModel.update(
        { nome: req.body.nome, descricao: req.body.descricao, foto: file.path },
        {
          where: {
            [Op.and]: [
              {
                id: { [Op.like]: req.params.id },
              },
              {
                admid: { [Op.like]: aluno.id },
              },
            ],
          },
        }
      );

      return res.status(200).json(updateSala);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const EnterSala = async (req, res) => {
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
        {
          model: AllModels.AlunoModel,
          attributes: ["nome", "sobrenome", "foto"],
        },
      ],
    });

    return res.status(200).json(alunosalas);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const CreateDocument = async (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

    const file = req.file;

    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça Login Para Executar tal ação" });
    }

    token.verify(cookie, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const CreateDocument = await AllModels.documents.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        arquivo: file.path,
        userid: aluno.id,
        salaid: req.params.salaid,
        aula: req.body.aula,
      });

      const saveddocument = await CreateDocument.save();

      return res.status(200).json(saveddocument);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const TakeDocumentsInSala = async (req, res) => {
  try {
    const Documents = await AllModels.documents.findOne({
      where: { salaid: req.params.salaid },
      include: [{ model: AllModels.AlunoModel, attributes: ["nome", "foto"] }],
    });

    return res.status(200).json(Documents);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const SearchDocumentsByAula = async (req, res) => {
  try {
    const SearchDocument = await AllModels.documents.findOne({
      where: {
        [Op.and]: [
          {
            salaid: { [Op.like]: req.params.salaid },
          },
          {
            aula: { [Op.like]: req.body.aula },
          },
        ],
      },
      include: [{ model: AllModels.AlunoModel, attributes: ["nome", "foto"] }],
    });
    return res.status(200).json(SearchDocument);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const DeleteDocument = async (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça login para executar tal ação" });
    }

    token.verify(cookie, process.env.TOKEN, async (err, aluno) => {
      if (err) return res.status(400).json({ message: "Token inválido" });

      const DeleteDocument = await AllModels.documents.destroy({
        where: {
          [Op.and]: [
            {
              id: { [Op.like]: req.params.id },
            },
            {
              userid: { [Op.like]: aluno.id },
            },
          ],
        },
      });

      return res.status(200).json(DeleteDocument);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.GetAllSalas = GetAllSalas;
exports.GetSalaInformation = GetSalaInformation;
exports.CreateSala = CreateSala;
exports.UpdateSala = UpdateSala;
exports.DeleteSalaWhenAdm = DeleteSalaWhenAdm;
exports.EnterSala = EnterSala;
exports.ExitSala = ExitSala;
exports.GetAlunosInSalas = GetAlunosInSalas;
exports.CreateDocument = CreateDocument;
exports.TakeDocumentsInSala = TakeDocumentsInSala;
exports.SearchDocumentsByAula = SearchDocumentsByAula;
exports.DeleteDocument = DeleteDocument;
