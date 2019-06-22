const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const pool = require('./modules/pool')

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/

app.get('/api/movies', (req, res) => {
    pool.query('SELECT * FROM "movies" ORDER BY "title";')
        .then( result => {
            res.send(result.rows);
        })
        .catch( error => {
            console.log(error);
        })
})

app.put('/api/movies', (req, res) => {
    pool.query(`UPDATE "movies" 
	SET "title" = $1, "description" = $2
    WHERE "id" = $3;`, [req.body.title, req.body.description, req.body.id])
    .then( response => {
        res.sendStatus(200);
    })
    .catch( error => {
        console.log(error)
    })
})

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});