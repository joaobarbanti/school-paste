const Sequelize = require("sequelize");
const db = require("../db");

const AlunoModel = db.define("alunos", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sala: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  foto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const SalaModel = db.define("salas", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  foto: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  admid: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

SalaModel.belongsTo(AlunoModel, {
  constraint: true,
  foreignKey: "admid",
});

exports.AlunoModel = AlunoModel;
exports.SalaModel = SalaModel;
