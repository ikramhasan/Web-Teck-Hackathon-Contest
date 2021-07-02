const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  multipleStatements: true,
  charset: "utf8mb4",
});

db.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("Connection established with database");
});

module.exports = db;
