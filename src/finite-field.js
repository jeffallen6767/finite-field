// finite field, see: https://en.wikipedia.org/wiki/Finite_field
// note: in order to do this with arbitrarily large numbers
// without rounding error we have to use bignumber
// NOTE: bignumbers are prefixed with b_

var 
  BigNumber = require('bignumber.js'),
  CHAR_ONE_SPACE = " ",
  CHAR_NEW_LINE = "\n";

function range(start, end, step) {
  var 
    result = [],
    b_idx = new BigNumber(0),
    b_start = new BigNumber(start),
    b_end = new BigNumber(end),
    b_amount = new BigNumber(step || 1);
  
  while (b_start.lt(b_end)) {
    var
      idx = b_idx.valueOf();
    result[idx] = new BigNumber(b_start);
    b_start = b_start.add(b_amount);
    b_idx = b_idx.add(1);
  }

  return result;
}

function finite_field(order) {
  var 
    minimum = new BigNumber(0),
    maximum = new BigNumber(order),
    field = range(minimum, maximum),
    math_funcs = {
      "add": function (b_x, b_y, b_o) {
        /*
        return (x + y) % order;
        */
        var 
          b_s = b_x.add(b_y),
          b_r = b_s.mod(b_o);
        return b_r;
      },
      "subtract": function (b_x, b_y, b_o) {
        /*
        return (x - y) % order;
        */
        var 
          b_s = b_x.sub(b_y),
          b_r = b_s.lt(minimum) ? b_s.add(b_o) : b_s;
        return b_r;
      },
      "multiply": function (b_x, b_y, b_o) {
        /*
        return (x * y) % order;
        */
        var 
          b_s = b_x.mul(b_y),
          b_r =  b_s.mod(b_o);
        return b_r;
      },
      "divide": function (b_x, b_y, b_o) {
        /*
        return (x / y) % order;
        note: using Fermat’s Little Theorem.
        n^(p-1)=1 mod p where p is prime
        which implies
        n^(p-2)=1/n mod p where p is prime
        2/3 = 2 * (3 ^ (p-2)) = 4 mod p where p is prime
        */
        var 
          b_p = b_o.sub(2),
          b_s = b_x.mul(
            b_y.pow(b_p)
          ),
          b_r = b_s.mod(b_o);
        return b_r;
      },
      "pow": function (b_x, b_y, b_o) {
        /*
        return (x ^ y) % order;
        */
        var 
          b_r =  b_x.pow(b_y, b_o);
        return b_r;
      }
    },
    math_keys = Object.keys(math_funcs),
    finite_field = {
      "minimum": minimum,
      "maximum": maximum,
      "order": maximum,
      "field": field,
      "data": {},
      "math": {},
      "toString": function() {
        return [
          "finite field order:",
          order,
          "=",
          "[" + field[0] + ", " + field[1] + ", ..." + field[order-1] + "]"
        ].join(CHAR_ONE_SPACE);
      }
    };
  
  // create math functions:
  math_keys.forEach(function(math_key) {
    var
      math = finite_field.math,
      data = finite_field.data,
      math_func = math_funcs[math_key];
    math[math_key] = function(b_x, b_y) {
      var
        result = data[math_key];
      if (!result) {
        result = data[math_key] = calc_sets(finite_field, math_func);
      }
      if (b_x) {
        result = result.sets[b_x];
        if (b_y) {
          result = result[b_y];
        }
      }
      return result;
    };
  });
  
  return finite_field;
}

function calc_sets(ff, algo) {
  var 
    sets = [],
    field = ff.field,
    order = ff.order,
    b_x = new BigNumber(0),
    b_y = new BigNumber(0),
    b_max = new BigNumber(field.length),
    HORZ_RULE = [],
    x,y,z,
    result;
  
  if (b_max.gt(0)) {
    while (b_x.lt(b_max)) {
      x = b_x.valueOf();
      sets[x] = z = [];
      HORZ_RULE.push("---");
      b_y = new BigNumber(0);
      while (b_y.lt(b_max)) {
        y = b_y.valueOf();
        z[y] = algo(field[x], field[y], order);
        b_y = b_y.add(1);
      }
      b_x = b_x.add(1);
    }
  }
  
  result = {
    "field": field,
    "sets": sets,
    "toString": function() {
      var 
        horz = ["  "].concat(field),
        ruled = [horz, ["   " + HORZ_RULE.join("")]].concat(sets),
        lines = ruled.map(function(set, idx) {
          var 
            num = idx - 1,
            vert = (num > 0 ? [num-1] : []).concat(set);
          return vert.reduce(function(sum, val, index) {
            sum.push(
              (val < 10 ? CHAR_ONE_SPACE + val : val) + (num < 1 || index ? "" : "|")
            );
            return sum;
          }, []).join(CHAR_ONE_SPACE);
        });
      return lines.join(CHAR_NEW_LINE);
    }
  };
  
  return result;
}

module.exports = {
  "finite_field": finite_field,
  "calc_sets": calc_sets
};
