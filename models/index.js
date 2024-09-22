const sequelize = require("../config/database");
const Book = require("./bookModel");

const initDb = async () => {
  await sequelize.sync({ force: false });
  console.log("Database synced successfully");
};

module.exports = { Book, initDb };
