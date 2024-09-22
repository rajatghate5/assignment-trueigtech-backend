const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "books", 
});

module.exports = { Book };
