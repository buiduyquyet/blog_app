import express from 'express';
import mysql from 'mysql2';
var app = express();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "blog"
});
connection.connect();

const resultsPerPage = 5;

app.get("/", (req, res) => {
    let sql = "SELECT * FROM blog.posts";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numOfPages));
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'));
        }
        const startingLimit = (page - 1) * resultsPerPage;
        sql = `SELECT * FROM blog.posts LIMIT ${startingLimit}, ${resultsPerPage}`;
        connection.query(sql, (err, result) => {
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
                totalPage: numOfPages
            });
        });
    });
});

app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});

// function exitHandler(options, err) {
//     if (options.shutdownDb) {
//         console.log('shutdown mysql connection');
//         connection.end();
//     }
//     if (err) console.log(err.stack);
//     if (options.exit) process.exit();
// }