//Consts declaration
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?'~/\\";

const MAX_RECENT_PASSWORDS = 5; // Maximum number of recent passwords to display
let recentPasswords = []; // Array to store the generated passwords

function ClearPass() { //This function reset the current password

  document.getElementById('display').value = "";
}

function RemovePastedPass() {

  document.getElementById("AppliedPass").value = "";
  document.getElementById("PasswordStrength").innerHTML = ""; // clear the password strength element
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

  if(!IncUppercase && !IncLowercase && !IncNumbers && !IncSymbols) { //Checking if at least one option is selected
    alert("None of the options are selected ! Please try again.");
    return;
  }

  var charset = '';
  
  //charset declaration
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

  //Checking if at least one of each category is included in the password
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
  
  // Pushing the generated password to the recent passwords array
  recentPasswords.push(password);

  // If the recent passwords array is longer than the maximum allowed, remove the oldest passwords
  if (recentPasswords.length > MAX_RECENT_PASSWORDS) {
    recentPasswords.splice(0, recentPasswords.length - MAX_RECENT_PASSWORDS);
  }

  // Loop through the recent passwords array and update the Fpass fields
  for (let i = 1; i <= MAX_RECENT_PASSWORDS; i++) {
    const recentPassword = recentPasswords[recentPasswords.length - i];
    const fieldId = `Fpass${i}`;
    if (recentPassword) {
      document.getElementById(fieldId).value = recentPassword;
    } else {
      document.getElementById(fieldId).value = '';
    }
  }
  
}

function CopyPassMain() { //This function enables the feature of copying the password
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

function PastePass() {
  navigator.clipboard.readText().then((text) => {
    document.getElementById("AppliedPass").value = text;

    // Check password strength and update the PasswordStrength element
    var password = text.trim();
    var strength = "";
    if (password.length < 12) {

      strength = "Weak";
      document.getElementById("PasswordStrength").innerHTML = "🔴 " + strength;
    } else if (password.length < 18) {

      strength = "Mid";
      document.getElementById("PasswordStrength").innerHTML = "🟡 " + strength;
    } else if (password.length < 25) {

      strength = "Strong";
      document.getElementById("PasswordStrength").innerHTML = "🟠 " + strength;
    } else {

      strength = "Super Strong";
      document.getElementById("PasswordStrength").innerHTML = "🟢 " + strength;
    }
  });
}

//Copying specific passwords from the most-recent list
function CopyPassMR1() {
  var copyIn = document.getElementById('Fpass1');

  if(copyIn.value !== "") {

    copyIn.select();
    copyIn.setSelectionRange(0, 999999);
  
    navigator.clipboard.writeText(copyIn.value);
    
    alert("Password copied to clipboard ✔️");
  }else {

    alert("Password is blank ! Please click to generate a password.❌");
  }
}

function CopyPassMR2() {
  var copyIn = document.getElementById('Fpass2');

  if(copyIn.value !== "") {

    copyIn.select();
    copyIn.setSelectionRange(0, 999999);
  
    navigator.clipboard.writeText(copyIn.value);
    
    alert("Password copied to clipboard ✔️");
  }else {

    alert("Password is blank ! Please click to generate a password.❌");
  }
}

function CopyPassMR3() {
  var copyIn = document.getElementById('Fpass3');

  if(copyIn.value !== "") {

    copyIn.select();
    copyIn.setSelectionRange(0, 999999);
  
    navigator.clipboard.writeText(copyIn.value);
    
    alert("Password copied to clipboard ✔️");
  }else {

    alert("Password is blank ! Please click to generate a password.❌");
  }
}

function CopyPassMR4() {
  var copyIn = document.getElementById('Fpass4');

  if(copyIn.value !== "") {

    copyIn.select();
    copyIn.setSelectionRange(0, 999999);
  
    navigator.clipboard.writeText(copyIn.value);
    
    alert("Password copied to clipboard ✔️");
  }else {

    alert("Password is blank ! Please click to generate a password.❌");
  }
}

function CopyPassMR5() {
  var copyIn = document.getElementById('Fpass5');

  if(copyIn.value !== "") {

    copyIn.select();
    copyIn.setSelectionRange(0, 999999);
  
    navigator.clipboard.writeText(copyIn.value);
    
    alert("Password copied to clipboard ✔️");
  }else {

    alert("Password is blank ! Please click to generate a password.❌");
  }
}

//Removing specific passwords from the most-recent list
function RemovePassMR1() {
  var pass1 = document.getElementById('Fpass1');
  var pass2 = document.getElementById('Fpass2');
  var pass3 = document.getElementById('Fpass3');
  var pass4 = document.getElementById('Fpass4');
  var pass5 = document.getElementById('Fpass5');

  pass1.value = pass2.value;
  pass2.value = pass3.value;
  pass3.value = pass4.value;
  pass4.value = pass5.value;
  pass5.value = "";

  recentPasswords[0] = pass5.value;
  recentPasswords[1] = pass4.value;
  recentPasswords[2] = pass3.value;
  recentPasswords[3] = pass2.value;
  recentPasswords[4] = pass1.value;
}

function RemovePassMR2() {
  var pass2 = document.getElementById('Fpass2');
  var pass3 = document.getElementById('Fpass3');
  var pass4 = document.getElementById('Fpass4');
  var pass5 = document.getElementById('Fpass5');

  pass2.value = pass3.value;
  pass3.value = pass4.value;
  pass4.value = pass5.value;
  pass5.value = "";

  recentPasswords[0] = pass5.value;
  recentPasswords[1] = pass4.value;
  recentPasswords[2] = pass3.value;
  recentPasswords[3] = pass2.value;
}

function RemovePassMR3() {
  var pass3 = document.getElementById('Fpass3');
  var pass4 = document.getElementById('Fpass4');
  var pass5 = document.getElementById('Fpass5');

  pass3.value = pass4.value;
  pass4.value = pass5.value;
  pass5.value = "";

  recentPasswords[0] = pass5.value;
  recentPasswords[1] = pass4.value;
  recentPasswords[2] = pass3.value;
}

function RemovePassMR4() {
  var pass4 = document.getElementById('Fpass4');
  var pass5 = document.getElementById('Fpass5');

  pass4.value = pass5.value;
  pass5.value = "";

  recentPasswords[0] = pass5.value;
  recentPasswords[1] = pass4.value;
}

function RemovePassMR5() {
  var pass5 = document.getElementById('Fpass5');

  pass5.value = "";

  recentPasswords[0] = pass5.value;
}
