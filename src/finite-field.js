// finite field, see: https://en.wikipedia.org/wiki/Finite_field
// this is an exercise from https://eng.paxos.com/blockchain-101-foundational-math

// Write a program to calculate 1*k, 2*k, 3*k, … 30*k for some k in F31. 
// Notice anything about these sets?

var 
  CHAR_ONE_SPACE = " ",
  CHAR_NEW_LINE = "\n";

function range(start, end, step) {
  var 
    result = [],
    amount = step || 1,
    idx = 0,
    x;
  
  for (x=start; x<end; x+=amount) {
    result[idx++] = x;
  }
  
  return result;
}

function finite_field(order) {
  var 
    field = range(1, order),
    result = {
      "order": order,
      "field": field,
      "toString": function() {
        return [
          "finite field order:",
          order,
          "=",
          "[" + field[0] + ", " + field[1] + ", ..." + field[order-2] + "]"
        ].join(CHAR_ONE_SPACE);
      }
    };
  
  return result;
}

function calc_sets(ff, algo) {
  var 
    sets = [],
    field = ff.field,
    order = ff.order,
    start = 0,
    end = field.length,
    HORZ_RULE = [],
    x,y,z,
    result;
  
  if (end) {
    for (x=start; x<end; x++) {
      sets[x] = z = [];
      HORZ_RULE.push("---");
      for (y=start; y<end; y++) {
        z[y] = algo(field[x], field[y], order);
      }
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
            vert = (num > 0 ? [num] : []).concat(set);
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