// TODO: Based on the rules here, return an object with a properties `className` and `message`
//
// - A password with length less than 6 has `message` 'Short' and `className` 'short'
//
// Otherwise, we assign the password a score representing its strength. The
// score starts at 0 and will be incremented by one for each of the following
// conditions the password satisfies:
//
// - The password has length longer than 7
// - The password has at least one capital and lowercase letter
// - The password has at least one letter and at least one number
// - The password contains at two or more symbols
//
// We define symbols to be the following characters:
//    '!', '%', '&', '@', '#', '$', '^', '*', '?', '_', '~'
//
// Based on the value from the rules above, return the object with the correct
// values from the corresponding table:
//
// | Score | Class Name | Message         |
// |-------+------------+-----------------|
// | s < 2 | weak       | Weak Password   |
// | s = 2 | good       | Good Password   |
// | s > 2 | strong     | Strong Password |

let numUC = 0;
let numLC = 0;
let numNB = 0;

function checkStrength(password) {
  // TODO: Change this.
  var inputPW = document.getElementById("password").value;
  let score = 0;
  var uppercase = /[A-Z]/g;
  var lowercase = /[a-z]/g;
  var num = /[0-9]/g;
  const symbols = /[!%&@#$^*?_~]/;
  
  if (inputPW.length <= 5){
    return{
      message: 'Short',
      className: 'short'
    }
  } 
  
  if (password.match(uppercase)) {
      numUC = numUC + 1;
    }
  if (password.match(lowercase)) {
    numLC = numLC + 1;
  }
  if (password.match(num)) {
    numNB = numNB + 1;
  }
  if (symbols.test(password)) {
    let numSB = 0;
    for (var i = 0; i < inputPW.length; i++){
      if (symbols.test(inputPW.charAt(i))){
        numSB = numSB + 1;
      }
    }
    if (numSB >= 2){
      score = score + 1;
    }
  }

  if (inputPW.length >= 8){
    score = score + 1;
  }
  if ((numLC >= 1) && (numUC >= 1)){
    score = score + 1;
  }
  if ((numNB >= 1) && ((numLC >= 1) || (numUC >= 1))){
    score = score + 1;
  }

  console.log("socre: " + score);
  console.log(inputPW);

  if (score < 2){
    return{
      message: 'Weak Password',
      className: 'weak'
    }
  } else if (score == 2){
    return{
      message: 'Good Password',
      className: 'good'
    }
  } else if (score > 2){
    return{
      message: 'Strong Password',
      className: 'strong'
    }
  }
}

// You do not need to change this function. You may want to read it -- as you will find parts of it helpful with
// the countdown widget.
function showResult(password) {
  const { message, className } = checkStrength(password);

  if(!message || !className) {
    console.error("Found undefined message or className");
    console.log("message is", message);
    console.log("className is", className);
  }

  // This gets a javascript object that represents the <span id="pwdresult"></span> element
  // Using this javascript object we can manipulate the HTML span by
  // changing it's class and text content
  const resultElement = document.getElementById("pwdresult");

  // This sets the class to one specific element (since you can have multiple classes it's a list)
  resultElement.classList = [className];
  // This sets the text inside the span
  resultElement.innerText = message;
}

// Add a listener for the strength checking widget
function addPasswordListener() {
  let passwordEntry = document.getElementById('password');
  passwordEntry.addEventListener("keyup", () => {
    const password = passwordEntry.value;
    showResult(password);
  });
}

addPasswordListener();
