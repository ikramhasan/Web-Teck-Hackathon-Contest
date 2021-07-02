const db = require("../databaseConnection");

exports.getAllBlogs = (req, res) => {
  const sql =
    "SELECT * FROM blog b INNER JOIN user u WHERE b.user_id = u.user_id";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }

    res.status(201).json({
      status: "success",
      // token,
      data: result,
    });
  });
};
