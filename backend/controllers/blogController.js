const db = require("../databaseConnection");
const readingTime = require("reading-time");

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

exports.createBlog = (req, res) => {
  const sql = "INSERT INTO blog SET ?";

  const blog = req.body;
  const stats = readingTime(blog.caption);

  db.query(
    sql,
    {
      caption: blog.caption,
      user_id: blog.user_id,
      vote_count: 0,
      image_url: blog.image_url,
      createdAt: new Date(),
      tag: blog.tag,
      time_to_read: stats.text,
    },
    (err, result) => {
      if (!err) {
        res.status(201).json({
          status: "success",
          // token,
          data: result,
        });
      }
    }
  );
};

exports.vote = (req, res) => {
  const sql = "UPDATE blog SET vote_count = ? WHERE blog_id = ?";
  console.log(req.body);
  const { vote_count, blog_id } = req.body;

  db.query(sql, [vote_count, blog_id], (err, result) => {
    if (!err) {
      res.status(201).json({
        status: "success",
        // token,
        data: result,
      });
    }
  });
};
