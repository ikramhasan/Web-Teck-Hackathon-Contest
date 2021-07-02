var validator = require("validator");
const db = require("../databaseConnection");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 6) {
    res.status(500).json({
      status: "fail",
      message: "Password must be longer than 6 charecters",
    });
  }

  if (!validator.isEmail(email)) {
    res.status(500).json({
      status: "fail",
      message: "Invalid email provided",
    });
  }

  const sql = "INSERT INTO user SET ?";

  db.query(sql, req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message:
          err.code === "ER_DUP_ENTRY" ? "User already exists!" : err.message,
      });
    }

    res.status(201).json({
      status: "success",
      // token,
      data: {
        user: result,
      },
    });
  });
};
