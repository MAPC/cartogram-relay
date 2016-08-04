var express = require('express');
var router = express.Router();
var CartoDB = require('cartodb');



function convertToInfogram(data) {
  var arrays = [[]];

  data.rows.forEach(function(row) {
    var core = arrays[0];
    core.push([row.city, row.rate]);
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
