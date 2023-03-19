const UPPERCASE_LETTERS ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS ="0123456789";
const SYMBOLS ="!@#$%^&*()_+-=[]{}|;:,.<>?'~/\\";

function ClearPass() {

  document.getElementById('display').value = "";
}

function showAmount(newAmount) {
  
  document.getElementById('amount').innerHTML = newAmount;
}

function generatePass() {
  
  var passwordlenght = document.querySelector('input.inputRange').value;

  var IncUppercase = document.getElementById('uppercaseLet').checked;
  var IncLowercase = document.getElementById('lowercaseLet').checked;
  var IncNumbers = document.getElementById('numbers').checked;
  var IncSymbols = document.getElementById('symbols').checked;

  if(!IncUppercase && !IncLowercase && !IncNumbers && !IncSymbols) {
    alert("None of the options are selected ! Please try again.");
  }

  var charset = '';
  
  if(IncUppercase) {
    charset += UPPERCASE_LETTERS;
  }

  if(IncLowercase) {
    charset += LOWERCASE_LETTERS;
  }
  
  if(IncNumbers) {
    charset += NUMBERS;
  }
  
  if(IncSymbols) {
    charset += SYMBOLS;
  }

  var password = '';
  var containsUppercase = !IncUppercase;
  var containsLowercase = !IncLowercase;
  var containsNumber = !IncNumbers;
  var containsSymbol = !IncSymbols;

  while(!(containsUppercase && containsLowercase && containsNumber && containsSymbol)){
    password = '';
    var containsUppercase = !IncUppercase;
    var containsLowercase = !IncLowercase;
    var containsNumber = !IncNumbers;
    var containsSymbol = !IncSymbols;

    for(var i = 0; i < passwordlenght; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      var randomChar = charset.charAt(randomIndex);
      password += randomChar;
      if(IncUppercase && UPPERCASE_LETTERS.indexOf(randomChar) !== -1) {
        containsUppercase = true;
      }
      if(IncLowercase && LOWERCASE_LETTERS.indexOf(randomChar) !== -1) {
        containsLowercase = true;
      }
      if(IncNumbers && NUMBERS.indexOf(randomChar) !== -1){
        containsNumber = true;
      }
      if(IncSymbols && SYMBOLS.indexOf(randomChar) !== -1){
        containsSymbol = true;
      }
    }

  }

  document.getElementById('display').value = password;

}

function CopyPass() {
  var copyIn = document.getElementById('display');

  if(copyIn.value !== "") {

    copyIn.select();
    copyIn.setSelectionRange(0, 999999);
  
    navigator.clipboard.writeText(copyIn.value);
    
    alert("Password copied to clipboard ✔️");
  }else {

    alert("Password is blank ! Please click to generate a password.❌");
  }
  
}
