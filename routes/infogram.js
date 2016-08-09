var express = require('express');
var router = express.Router();
var CartoDB = require('cartodb');
var d3 = require('d3');


function convertToInfogram(data) {

  // data = data.rows.entries();
  var arrays = [[]];
  var core = arrays[0];
  var series = [];
  var firstRow = data.rows[0];

  for (var [i,k] of firstRow) {
    // if (firstRow.hasOwnProperty(i)) {
      series.push(i);
    // }
  }

  core.push(series);

  data.rows.forEach(function(row) {
    var core = arrays[0];
    var collection = [];

    for (var [i,k] of row) {
      // if (row.hasOwnProperty(i)) {
        collection.push(row.get(i));
      // }
    }
    core.push(collection);
  });
  
  return arrays;
  
}

function cast(data, groupBy, aggrBy, val) {
  var result = [];
  var nestedData = d3.nest()
                  .key(function(d) { return d[groupBy]; })
                  .entries(data.rows);
  

  nestedData.forEach(function(each) {
    var obj = {};
    var map = new Map();
    obj[groupBy] = each.key;
    map.set(groupBy, each.key);
    
    each.values.forEach(function(d) {
      map.set(d[aggrBy], d[val]);
      obj[d[aggrBy]] = d[val];
    });
    
    delete each.values;
    delete each.key;

    result.push(map);
  });
  
  return { rows: result };

}

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.query.user;
  if (!req.query.user) { user = "mapc-maps"; }

  var sql = new CartoDB.SQL({user:user});
  sql.execute(req.query.sql)
    .done(function(data) { 
      var groupBy = req.query.groupBy,
          aggrBy = req.query.aggrBy, 
          val = req.query.val;

      if (groupBy && aggrBy && val) { data = cast(data, groupBy, aggrBy, val); }
      else { 
        var result = [];
        data.rows.forEach(function(row) {
          var map = new Map();
          for (i in row) {
            if (row.hasOwnProperty(i)) {
              map.set(i, row[i]);    
            }
          }
          result.push(map);
          
        });
        data = { rows: result }
        console.log(data);
      }
        
      res.send(convertToInfogram(data));
    })
    .error(function(error) {
      res.send(error);
    });

});

module.exports = router;
