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
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
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

const EnterinSala = db.define("entersala", {
  salaid: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  userid: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

const documents = db.define("documents", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  arquivo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userid: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  salaid: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  aula: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

SalaModel.belongsTo(AlunoModel, {
  constraint: true,
  foreignKey: "admid",
});

EnterinSala.belongsTo(SalaModel, {
  constraint: true,
  foreignKey: "salaid",
});

EnterinSala.belongsTo(AlunoModel, {
  constraint: true,
  foreignKey: "userid",
});
documents.belongsTo(AlunoModel, {
  constraint: true,
  foreignKey: "userid",
});
documents.belongsTo(SalaModel, {
  constraint: true,
  foreignKey: "salaid",
});

exports.AlunoModel = AlunoModel;
exports.SalaModel = SalaModel;
exports.EnterinSala = EnterinSala;
exports.documents = documents;
