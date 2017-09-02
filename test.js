// test finite field
var
  debug = false,
  FINITE_FIELD_ORDER = 31,
  tester = require("testing"),
  ff = require("./index"),
  CHAR_ONE_SPACE = " ",
  field = ff.finite_field(FINITE_FIELD_ORDER),
  min = field.field[0],
  test = debug ? {"x": 4, "y": 8, "out": []} : null,
  sets = [
    {
      "title": "add", 
      "data": ff.calc_sets(field, function (x, y, order) {
        /*
        return (x + y) % order;
        */
        var simple = x + y,
          result = simple > order ? simple % order : simple;
        if (test && x == test.x && y == test.y) {
          test.out.push({
            "add": x + "+" + y, 
            "x": x, 
            "y": y,
            "simple": simple,
            "result": result
          });
        }
        return result;
      })
    },
    {
      "title": "subtract", 
      "data": ff.calc_sets(field, function (x, y, order) {
        /*
        var r = x - y,
          t = r < 1 ? order + r : r;
        return t % order;
        */
        var simple = x - y,
          result = simple < min ? order + simple : simple;
        if (test && x == test.x && y == test.y) {
          test.out.push({
            "subtract": x + "-" + y, 
            "x": x, 
            "y": y,
            "simple": simple,
            "result": result
          });
        }
        return result;
      })
    },
    {
      "title": "multiply", 
      "data": ff.calc_sets(field, function (x, y, order) {
        /*
        return (x * y) % order;
        */
        var simple = x * y,
          result = simple > order ? simple % order : simple;
        if (test && x == test.x && y == test.y) {
          test.out.push({
            "multiply": x + "*" + y, 
            "x": x, 
            "y": y,
            "simple": simple,
            "result": result
          });
        }
        return result;
      })
    },
    {
      "title": "divide", 
      "data": ff.calc_sets(field, function (x, y, order) {
        // very inefficient for larger fields
        var t = x,
          result = simple = t / y,
          tries = test && [[t, result]];
        while (result !== Math.floor(result)) {
          t += order;
          result = t / y;
          test && tries.push([t, result]);
        }
        if (test && x == 29 && y == 27) {
          test.out.push({
            "divide": x + "/" + y, 
            "x": x, 
            "y": y,
            "t": t,
            "tries": tries,
            "simple": simple,
            "result": result
          });
        }
        return result;
      })
    }
  ];

console.log(CHAR_ONE_SPACE);
console.log(field.toString());

sets.forEach(function(set) {
  console.log(CHAR_ONE_SPACE);
  console.log(set.title);
  console.log(set.data.toString());
});

if (test) {
  console.log(CHAR_ONE_SPACE);
  test.out.forEach(function(row) {
    console.log(row);
  });
}
