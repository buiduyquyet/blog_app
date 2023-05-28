import { db } from "../db.js";
import jwt from "jsonwebtoken";
const resultsPerPage = 5;

export const getPosts = (req, res) => {
  let sql = "SELECT * FROM blog.posts";

  db.query(sql, (err, data) => {
    if (err) throw err;
    const numOfResults = data.length;
    const numOfPages = Math.ceil(numOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numOfPages) {
      res.redirect('/?page=' + encodeURIComponent(numOfPages));
    } else if (page < 1) {
      res.redirect('/?page=' + encodeURIComponent('1'));
    }
    const startingLimit = (page - 1) * resultsPerPage;
    sql = `SELECT * FROM blog.posts LIMIT ${startingLimit}, ${resultsPerPage}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      let iterator = (page - 5) < 1 ? 1 : page - 5;
      let endingLink = (iterator + 9) <= numOfPages ? (iterator + 9) : page + (numOfPages - page);
      if (endingLink < (page + 4)) {
        iterator -= (page + 4) - numOfPages;
      }
      return res.status(200).json({
        result: result,
        page: page,
        limit: startingLimit,
        totalRow: numOfResults,
        totalPage: numOfPages,
        iterator: iterator,
        endingLink: endingLink
      });
    });
  });
};

export const getPostByCat = (req, res) => {
  let sql = req.query.cat
    ? "SELECT * FROM blog.posts WHERE cat=?"
    : "SELECT * FROM blog.posts";
  db.query(sql, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
}

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const getPostByUser = (req, res) => {
  const uid = 2
  const q = "select posts.* from posts left join users on posts.uid = users.id where users.id = ?";
  db.query(q, [uid], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  })
}

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
