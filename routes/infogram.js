var express = require('express');
var router = express.Router();
var CartoDB = require('cartodb');



function convertToInfogram(data) {
  var arrays = [[]];

  var core = arrays[0];
  var series = [];
  var firstRow = data.rows[0];
  // first collection series names
  // series.push("dataset");
  for (i in firstRow) {
    if (firstRow.hasOwnProperty(i)) {
      series.push(i);
    }
  }

  core.push(series);

  data.rows.forEach(function(row) {
    var core = arrays[0];
    var collection = [];

    for (i in row) {
      if (row.hasOwnProperty(i)) {
        collection.push(row[i]);
      }
    }
    core.push(collection);
  });
  
  return arrays;
  
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.query.user;
  if (!req.query.user) { user = "mapc-maps"; }

  var sql = new CartoDB.SQL({user:user});
  sql.execute(req.query.sql)
    //you can listen for 'done' and 'error' promise events
    .done(function(data) { 
      res.send(convertToInfogram(data));//data.rows is an array with an object for each row in your result set
    })
    .error(function(error) {
      res.send(error);
    });

});

module.exports = router;
