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
    pool.query('SELECT * FROM "movies" ORDER BY "id";')
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(error);
        })
})

app.put('/api/movies', (req, res) => {
    pool.query(`UPDATE "movies" 
	SET "title" = $1, "description" = $2
    WHERE "id" = $3;`, [req.body.title, req.body.description, req.body.id])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/api/tags', (req, res) => {
    console.log(req.query);
    pool.query(`SELECT "movies"."id", "movies"."title", "genres"."name" FROM
                "movies" JOIN "movies_genres"
                    ON "movies"."id" = "movies_genres"."movie_id"
                JOIN "genres"
                    ON "movies_genres"."genre_id" = "genres"."id"
                    WHERE "movies"."id" = $1;`, [req.query.id])
        .then(response => {
            console.log(response.rows)
            res.send(response.rows);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

app.get('/api/genres/delete', (req, res) => {
    pool.query(`SELECT "movies_genres"."id" FROM
                "movies" JOIN "movies_genres"
                    ON "movies"."id" = "movies_genres"."movie_id"
                JOIN "genres"
                    ON "movies_genres"."genre_id" = "genres"."id"
                    WHERE "genres"."name" = $1 AND "movies"."id" = $2;`, [req.query.genre, req.query.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            res.sendStatus(500);
        })


})

app.delete('/api/genres/:id', (req, res) => {
    console.log(req.params.id);
    pool.query(`DELETE FROM "movies_genres" WHERE "id"=$1;`, [req.params.id])
        .then( response => {
            res.sendStatus(200);
        })
        .catch( error => {
            console.log(error);
        })
})

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});