const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");
const AllModels = require("../models/AllModels")

const Register = async (req, res) => {
  try {
    const file = req.file;

    const Aluno = await AllModels.AlunoModel.findOne({
      where: { sobrenome: req.body.sobrenome },
    });

    if (Aluno) {
      return res
        .status(500)
        .json({ message: "Aluno já existente, faça login" });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.senha, salt);

    const aluno = await AllModels.AlunoModel.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      sala: req.body.sala,
      foto: file.path,
      senha: hash,
    });
    const savedaluno = await aluno.save();
    res.status(200).json(savedaluno);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const Aluno = await AllModels.AlunoModel.findOne({
      where: { sobrenome: req.body.sobrenome },
    });

    if (!Aluno) {
      return res.status(404).json({
        message: "Sobrenome não encontrado, faça registro para continuar",
      });
    }

    const checkpassword = await bcrypt.compare(req.body.senha, Aluno.senha);

    if (!checkpassword) {
      return res.status(400).json({ message: "Senha incorreta" });
    }
    const validate = token.sign({ id: Aluno.id }, process.env.TOKEN);

    res
      .cookie("Acess_Token", validate, {
        secure: true,
      })
      .status(200)
      .json(validate);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const Logout = (req, res) => {
  try {
    res
      .clearCookie("Acess_Token", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "Deslogado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.Register = Register;
exports.Login = Login;
exports.Logout = Logout;
