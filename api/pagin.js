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
        //
        const startingLimit = (page - 1) * resultsPerPage;
        //
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




// // do something when app is closing
// // see http://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
// process.stdin.resume()
// process.on('exit', exitHandler.bind(null, { shutdownDb: true }));

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//     var numRows;
//     var numPerPage = 5;
//     var page = parseInt(req.query.page, 10) || 0;
//     var numPages;
//     var skip = page * numPerPage;
//     // Here we compute the LIMIT parameter for MySQL query
//     var limit = skip + ',' + numPerPage;
//     queryAsync('SELECT count(*) as numRows FROM blog.posts')
//         .then(function (results) {
//             numRows = results[0].numRows;
//             numPages = Math.ceil(numRows / numPerPage);
//             console.log('number of pages:', numPages);
//         })
//         .then(() => queryAsync('SELECT * FROM blog.posts ORDER BY ID DESC LIMIT ' + limit))
//         .then(function (results) {
//             var responsePayload = {
//                 results: results
//             };
//             if (page < numPages) {
//                 responsePayload.pagination = {
//                     current: page,
//                     perPage: numPerPage,
//                     previous: page > 0 ? page - 1 : undefined,
//                     next: page < numPages - 1 ? page + 1 : undefined
//                 }
//             }
//             else responsePayload.pagination = {
//                 err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
//             }
//             res.json(responsePayload);
//         })
//         .catch(function (err) {
//             console.error(err);
//             res.json({ err: err });
//         });
// });

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