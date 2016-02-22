var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

//set up pg
var connectionString = '';
if (process.env.DATABASE_URL !== undefined) {
  connectionString = process.env.DATABASE_URL + 'ssl'; //<---required for heroku
} else {
  connectionString = 'postgres://localhost:5432/to_do_app'; //<--end of path is the name of the database.
}

///handle a post
router.post('/', function (req, res){

  var addTask = {
    task_name: req.body.task_name,
  };

  pg.connect(connectionString, function(err, client) {
      client.query('INSERT INTO tasks (task_name) VALUES ($1)',
      [addTask.task_name],
        function(err, result, done) {
          if (err) {
            console.log('error inserting data: ', err);
            res.send(false);
          } else {
            res.send(result);
          }
        });
    });
  });

  router.put('/complete', function (req, res){
  console.log(req.body);
    pg.connect(connectionString, function(err, client) {
        client.query('UPDATE tasks SET task_complete = TRUE WHERE id =' + req.body.task_id,
          function(err, result, done) {
            if (err) {
              console.log('error inserting data: ', err);
              res.send(false);
            } else {
              res.send(result);
            }
          });
      });
    });


///handle a get
router.get('/', function(req, res) {
  var results = [];
    pg.connect(connectionString, function (err,client, done){
        var query = client.query ('SELECT * FROM tasks;');

        query.on('row', function (row){
            results.push(row);
        });

        query.on ('end', function () {
           client.end();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
});


module.exports = router;
