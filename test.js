// test finite field
var
  tester = require("testing"),
  BigNumber = require('bignumber.js'),
  FINITE_FIELD_ORDER = new BigNumber(31),
  ff = require("./index"),
  CHAR_ONE_SPACE = " ",
  field = ff.finite_field(FINITE_FIELD_ORDER),
  field_name = field.toString(),
  reducer = function(obj) {
    return obj.reduce(function(sum, val) {
      sum.push(
        val.valueOf()
      );
      return sum;
    }, []);
  },
  testData = {
    "add": {
      "title": [
        "add x + y mod p for all k",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          func = math["add"],
          data = func(),
          sets = data.sets,
          order = FINITE_FIELD_ORDER.toNumber(),
          num_rows = sets.length,
          row = sets[17],
          num_cols = row.length,
          vals = reducer(row),
          expected = "17,18,19,20,21,22,23,24,25,26,27,28,29,30,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16",
          getRow = func(17),
          getRowLen = getRow.length,
          getReduced = reducer(getRow),
          getEntry = func(17,27),
          getEntryVal = getEntry.toNumber();
        test.endTime();
        // output
        console.log(data.toString());
        console.log("test number of rows");
        test.assert.identical(num_rows, order);
        console.log("test number of columns");
        test.assert.identical(num_cols, order);
        console.log("test values in row 2");
        test.assert.identical(vals.join(), expected);
        console.log("test number of entries in getRow(2)");
        test.assert.identical(getRowLen, order);
        console.log("test values of entries in getRow(2)");
        test.assert.identical(getReduced.join(), expected);
        console.log("test value of 17 + 27 % 31 using getEntry");
        test.assert.identical(getEntryVal, 13);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    },
    "subtract": {
      "title": [
        "subtract x - y mod p for all k",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          func = math["subtract"],
          data = func(),
          sets = data.sets,
          order = FINITE_FIELD_ORDER.toNumber(),
          num_rows = sets.length,
          row = sets[17],
          num_cols = row.length,
          vals = reducer(row),
          expected = "17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,30,29,28,27,26,25,24,23,22,21,20,19,18",
          getRow = func(17),
          getRowLen = getRow.length,
          getReduced = reducer(getRow),
          getEntry = func(17,27),
          getEntryVal = getEntry.toNumber();
        test.endTime();
        // output
        console.log(data.toString());
        console.log("test number of rows");
        test.assert.identical(num_rows, order);
        console.log("test number of columns");
        test.assert.identical(num_cols, order);
        console.log("test values in row 2");
        test.assert.identical(vals.join(), expected);
        console.log("test number of entries in getRow(2)");
        test.assert.identical(getRowLen, order);
        console.log("test values of entries in getRow(2)");
        test.assert.identical(getReduced.join(), expected);
        console.log("test value of 17 - 27 % 31 using getEntry");
        test.assert.identical(getEntryVal, 21);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    },
    "multiply": {
      "title": [
        "multiply x * y mod p for all k",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          func = math["multiply"],
          data = func(),
          sets = data.sets,
          order = FINITE_FIELD_ORDER.toNumber(),
          num_rows = sets.length,
          row = sets[17],
          num_cols = row.length,
          vals = reducer(row),
          expected = "0,17,3,20,6,23,9,26,12,29,15,1,18,4,21,7,24,10,27,13,30,16,2,19,5,22,8,25,11,28,14",
          getRow = func(17),
          getRowLen = getRow.length,
          getReduced = reducer(getRow),
          getEntry = func(17,27),
          getEntryVal = getEntry.toNumber();
        test.endTime();
        // output
        console.log(data.toString());
        console.log("test number of rows");
        test.assert.identical(num_rows, order);
        console.log("test number of columns");
        test.assert.identical(num_cols, order);
        console.log("test values in row 2");
        test.assert.identical(vals.join(), expected);
        console.log("test number of entries in getRow(2)");
        test.assert.identical(getRowLen, order);
        console.log("test values of entries in getRow(2)");
        test.assert.identical(getReduced.join(), expected);
        console.log("test value of 17 * 27 % 31 using getEntry");
        test.assert.identical(getEntryVal, 25);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    },
    "divide": {
      "title": [
        "divide x / y mod p for all k",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          func = math["divide"],
          data = func(),
          sets = data.sets,
          order = FINITE_FIELD_ORDER.toNumber(),
          num_rows = sets.length,
          row = sets[17],
          num_cols = row.length,
          vals = reducer(row),
          expected = "0,17,24,16,12,22,8,29,6,26,11,10,4,18,30,28,3,1,13,27,21,20,5,25,2,23,9,19,15,7,14",
          getRow = func(17),
          getRowLen = getRow.length,
          getReduced = reducer(getRow),
          getEntry = func(17,27),
          getEntryVal = getEntry.toNumber();
        test.endTime();
        // output
        console.log(data.toString());
        console.log("test number of rows");
        test.assert.identical(num_rows, order);
        console.log("test number of columns");
        test.assert.identical(num_cols, order);
        console.log("test values in row 2");
        test.assert.identical(vals.join(), expected);
        console.log("test number of entries in getRow(2)");
        test.assert.identical(getRowLen, order);
        console.log("test values of entries in getRow(2)");
        test.assert.identical(getReduced.join(), expected);
        console.log("test value of 17 / 27 % 31 using getEntry");
        test.assert.identical(getEntryVal, 19);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    },
    "pow": {
      "title": [
        "pow x ^ y mod p for all k",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          func = math["pow"],
          data = func(),
          sets = data.sets,
          order = FINITE_FIELD_ORDER.toNumber(),
          num_rows = sets.length,
          row = sets[17],
          num_cols = row.length,
          vals = reducer(row),
          expected = "1,17,10,15,7,26,8,12,18,27,25,22,2,3,20,30,14,21,16,24,5,23,19,13,4,6,9,29,28,11,1",
          getRow = func(17),
          getRowLen = getRow.length,
          getReduced = reducer(getRow),
          getEntry = func(17,27),
          getEntryVal = getEntry.toNumber();
        test.endTime();
        // output
        console.log(data.toString());
        console.log("test number of rows");
        test.assert.identical(num_rows, order);
        console.log("test number of columns");
        test.assert.identical(num_cols, order);
        console.log("test values in row 2");
        test.assert.identical(vals.join(), expected);
        console.log("test number of entries in getRow(2)");
        test.assert.identical(getRowLen, order);
        console.log("test values of entries in getRow(2)");
        test.assert.identical(getReduced.join(), expected);
        console.log("test value of 17 ^ 27 % 31 using getEntry");
        test.assert.identical(getEntryVal, 29);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    },
    "finite_field.math.multiply(x,y)": {
      "title": [
        "compute 24 * 19 % 31",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          func = math["multiply"],
          getEntry = func(24,19),
          getEntryVal = getEntry.toNumber();
        test.endTime();
        // output
        console.log("test value of 24 * 19 % 31 using getEntry");
        test.assert.identical(getEntryVal, 22);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    },
    "finite_field.math.pow(x,y)": {
      "title": [
        "compute 17 ^ 3 % 31",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          func = math["pow"],
          getEntry = func(17,3),
          getEntryVal = getEntry.toNumber();
        test.endTime();
        // output
        console.log("test value of 17 ^ 3 % 31 using getEntry");
        test.assert.identical(getEntryVal, 15);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    },
    "finite_field.math.pow(x,y) and finite_field.math.multiply(x,y)": {
      "title": [
        "compute 5 ^ 5 * 18 % 31",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          pow = math["pow"],
          getEntryOne = pow(5,5),
          mult = math["multiply"],
          getEntryTwo = mult(getEntryOne, 18),
          getEntryVal = getEntryTwo.toNumber();
        test.endTime();
        // output
        console.log("test value of 5 ^ 5 * 18 % 31 using getEntry");
        test.assert.identical(getEntryVal, 16);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    },
    "finite_field.math.pow(x,y) k^30 % 31 for all k": {
      "title": [
        "k^30 % 31 for all k ( except zero ) in",
        field_name
      ].join(" in "),
      "tests": function(test) {
        test.startTime();
        var
          math = field.math,
          pow = math["pow"],
          row = field.field.reduce(function(sum, val, idx) {
            if (idx) {
              sum.push(
                val.pow(30, FINITE_FIELD_ORDER)
              );
            }
            return sum;
          }, []),
          vals = reducer(row),
          expected = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1";
        test.endTime();
        // output
        console.log("test values in row 30");
        test.assert.identical(vals.join(), expected);
        console.log(CHAR_ONE_SPACE);
        test.done();
      }
    }
  },
  testKeys = Object.keys(testData),
  tests = {};

// make tests
testKeys.forEach(function(testKey) {
  var
    testType = testData[testKey];
  tests[testType.title] = testType.tests;
});

// run tests
tester.run(tests);
