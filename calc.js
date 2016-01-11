function calc_exponents(input) {

  for (var i=0; i < input.length; i++) {
    if (input[i] == "^") {
      
      var op1 = Number(input[i-1]);
      var op2 = Number(input[i+1]);
      var res = "";
      res = Math.pow(op1, op2);
      
      var origInput = input;
      input = [];
      if (origInput.slice(0, i-1).length > 0) {
        input = origInput.slice(0, i-1);
      }
      input.push(res.toString());
      if (origInput.slice(i+2).length > 0) {
        input = input.concat(origInput.slice(i+2));
      }
      
      
      // reset to index before this expression
      i = i-2;
      
    }
  }
  return input;
}

function calc_add_sub(input) {

  for (var i=0; i < input.length; i++) {
    if (input[i] == "+" || input[i] == "-") {
      
      var op1 = Number(input[i-1]);
      var op2 = Number(input[i+1]);
      var res = "";
      if (input[i] == "+") {
        res = op1 + op2;
      } else if (input[i] == "-") {
        res = op1 - op2;
      }

      var origInput = input;
      input = [];
      if (origInput.slice(0, i-1).length > 0) {
        input = origInput.slice(0, i-1);
      }
      input.push(res.toString());
      if (origInput.slice(i+2).length > 0) {
        input = input.concat(origInput.slice(i+2));
      }
      
      // reset to index before this expression
      i = i-2;
      
    }
  }
  return input;
}

function calc_mult_div(input) {
  for (var i=0; i < input.length; i++) {
    if (input[i] == "*" || input[i] == "/") {
      
      var op1 = Number(input[i-1]);
      var op2 = Number(input[i+1]);
      var res = "";
      if (input[i] == "*") {
        res = op1 * op2;
      } else if (input[i] == "/") {
        res = op1 / op2;
      }

      var origInput = input;
      input = [];
      if (origInput.slice(0, i-1).length > 0) {
        input = origInput.slice(0, i-1);
      }
      input.push(res.toString());
      if (origInput.slice(i+2).length > 0) {
        input = input.concat(origInput.slice(i+2));
      }
      
      // reset to index before this expression
      i = i-2;
      
    }
  }
  return input;
}

function calculate(input) {
  var res = calc_exponents(input);
  res = calc_mult_div(res);
  res = calc_add_sub(res);
  return res;
}

function isOperator(input) {
  if (input == "+" || input == "-" || input == "*" || input == "/" || input == "^") {
    return true;
  }
  return false;
}

$("#btn_calculate").click(function() {
  // After clicking Calculate button
  var input = $("#input_calculator").val();
  $("#output").html(" ");
  
  // remove spaces
  input = input.replace(/ /g, "");

  // Get array of expressions, comma separated
  var expressions = input.split(",");
  var expressionsArray = [];

  
  $.each(expressions, function(index, elt) {
    // each expression
    // create array so that index 0 has the first expression, along with its answer
    
    // create numArray for each array
    var numArray = [];
    var tmp = "";
    for (var i = 0; i < elt.length; i++) {
      if (isOperator(elt[i]) == false) {
        tmp += elt[i];
      } else if (isOperator(elt[i]) == true) {
        // push the previous number and the current operator
        // also push this current number if at the end of string
        numArray.push(tmp);
        tmp = "";
        numArray.push(elt[i]);
      }
      
      if (i == elt.length-1) {
        numArray.push(tmp);
      }
      
    }
    
    var res = calculate(numArray);
    
    var entry = {input: elt, result: res};
    expressionsArray.push(entry);

  });
  
  

  var out = "";
  $.each(expressionsArray, function(index, elt) {
    // loop through expressions array and print the expression with its result
    console.log(index + " is " + elt.input + " with result " + elt.result);
    out += "Expression " + index + ": " + elt.input + " equals " + elt.result + "<br><br>";
  })
  $("#output").html(out);
});