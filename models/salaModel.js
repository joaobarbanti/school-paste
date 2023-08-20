const Sequelize = require("sequelize");
const db = require("../db");

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
    allowNull: false,
  },
  admid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "alunos",
      key: "id",
    },
  },
  userid: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: "alunos",
      key: "id",
    },
  },
});

module.exports = SalaModel;
