var express = require('express');
var router = express.Router();
var CartoDB = require('cartodb');
var d3 = require('d3');


function convertToInfogram(data) {
  // this needs to become more secure by having lookups
  var arrays = [[]];
  var core = arrays[0];
  var series = [];
  var firstRow = data.rows[0];

  firstRow.forEach(function(key, val) {
    // console.log(key,val);
    // if (firstRow.hasOwnProperty(i)) {
      series.push(val);
    // }
  })

  // series.push(data.rows[0].keys());

  core.push(series);

  // data.rows.forEach(function(row) {
  //   var core = arrays[0];
  //   var collection = [];

  //   row.forEach(function(i,k) {
  //     // if (row.hasOwnProperty(i)) {
  //       collection.push(i);
  //     // }
  //   } ) 

  //   core.push(collection);
  // });
  
  series.forEach(function(column) {
    var core = arrays[0];
    var collection = [];
    data.rows.forEach(function(row) {
     collection.push(row.get(column));
    });
    core.push(collection);
  });

  return arrays;
  
}

function cast(data, groupBy, aggrBy, val) {
  console.log(data.rows);
  var result = [];
  var nestedData = d3.nest()
                  .key(function(d) { return d[groupBy]; })
                  .entries(data.rows);
  

  nestedData.forEach(function(each) {

    var map = new Map();
    map.set(groupBy, each.key);
    
    each.values.forEach(function(d) {
      map.set(d[aggrBy], d[val]);
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
        var map = new Map(),
            result = [];
        data.rows.forEach(function(row) {
          for (i in row) {
            if (row.hasOwnProperty(i)) {
              map.set(i, row[i]);    
            }
          }
          result.push(map);
          
        });
        data = { rows: result }
      }
      res.send(convertToInfogram(data));
    })
    .error(function(error) {
      res.send(error);
    });

});

module.exports = router;
