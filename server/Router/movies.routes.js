const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route that will get all the movies from the db
router.get('/', (req, res) => {
    pool.query('SELECT * FROM "movies" ORDER BY "id";')
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(error);
        })
})

// PUT route that will update the specific movie in the db
router.put('/', (req, res) => {
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


// export the router
module.exports = router;