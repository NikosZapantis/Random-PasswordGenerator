//Consts declaration
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?'~/\\";

const MAX_RECENT_PASSWORDS = 5; //Maximum number of recent passwords to display

//Loading recent passwords array from localStorage
let recentPasswords = JSON.parse(localStorage.getItem('recentPasswords')) || [];

function loadRecentPasswords() {
  //Getting the recent passwords from localStorage
  const storedPasswords = localStorage.getItem('recentPasswords');

  //If there are stored passwords, I'm parsing and assigning them to the recentPasswords array
  if (storedPasswords) {
    recentPasswords = JSON.parse(storedPasswords);
  }

  //Loop through the recent passwords array and updating the Fpass fields
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



function showAmount(newAmount) {
  
  document.getElementById('amount').innerHTML = newAmount;
}

function generatePass() {
  var passwordlength = document.querySelector('input.inputRange').value;
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

    for(var i = 0; i < passwordlength; i++) {

      var randomIndex = Math.floor(Math.random() * charset.length);
      var randomChar = charset.charAt(randomIndex);
      password += randomChar;
      if(IncUppercase && UPPERCASE_LETTERS.indexOf(randomChar) !== -1) {

        containsUppercase = true;
      }
      if(IncLowercase && LOWERCASE_LETTERS.indexOf(randomChar) !== -1) {

        containsLowercase = true;
      }
      if(IncNumbers && NUMBERS.indexOf(randomChar) !== -1) {

        containsNumber = true;
      }
      if(IncSymbols && SYMBOLS.indexOf(randomChar) !== -1) {

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

  // Save recent passwords array to local storage
  localStorage.setItem('recentPasswords', JSON.stringify(recentPasswords));
}

//?DONE todo: Check if the password var is the same with one of the passwords of the most-recent list (No need to check the display because it's the most recent password)
//?DONE todo: Devellop a serious algorithm that will really show if the password is categorized in the specific strenght
function PastePass() {
  navigator.clipboard.readText().then((text) => {
    document.getElementById("AppliedPass").value = text;

    // Check password strength and update the PasswordStrength element
    var password = text.trim();
    var uniqueChars = new Set(password).size;
    var strengthValue = 0;
    var strength = "";

    //?DONE todo: Even if it gets inside this statement it pastes the clipboard element of the user.
    //?DONE todo: When you paste something that isn't in the list it erase the content but it still shows the rate of the strength {FIXED BY SHOWING A "NOT SUPPORTED" message}
    //?DONE todo: When you delete a password from the list but you still try to apply the specific pass in the AppliedPass element it shows alert but still pastes the other pass
    if(!recentPasswords.includes(password)) {
      
      alert("The password you try to paste is not registered in the most-recent list!");
      document.getElementById('AppliedPass').value = "";
      strength = "Not supported";
      document.getElementById("PasswordStrength").innerHTML = "🔴 " + strength;
      return;
    }

    if(SYMBOLS.split("").some(char => password.includes(char))) {

      strengthValue += 7.2;
      maxSymInclude = true;
    }
    if(UPPERCASE_LETTERS.split("").some(char => password.includes(char))) {

      strengthValue += 4.3;
      maxUpperInclude = true;
    }
    if(LOWERCASE_LETTERS.split("").some(char => password.includes(char))) {

      strengthValue += 4.3;
      maxLowerInclude = true;
    }
    if(NUMBERS.split("").some(char => password.includes(char))) {

      strengthValue += 3.2;
      maxNumInclude = true;
    }

    //TODO: Have to change the rate of symbols numbers etc in the previous if statements
    //TODO: Maybe a good idea will be to count how many characters of each category the password has and then multiply it's value with some specific points 
    strengthValue += (password.length * 2.5);
    strengthValue += (uniqueChars * 1.2);

    if(strengthValue <= 25) {

      strength = "Weak";
      document.getElementById("PasswordStrength").innerHTML = "🔴 " + strength + "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + " (" + strengthValue.toFixed(2) + "%)";
    }else if(strengthValue <= 50) {

      strength = "Normal";
      document.getElementById("PasswordStrength").innerHTML = "🟡 " + strength + "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + " (" + strengthValue.toFixed(2) + "%)";
    }else if(strengthValue <= 75) {

      strength = "Strong";
      document.getElementById("PasswordStrength").innerHTML = "🟠 " + strength + "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + " (" + strengthValue.toFixed(2) + "%)";
    }else {

      strength = "Super Strong";
      if(strengthValue > 100) {

        document.getElementById("PasswordStrength").innerHTML = "🟢 " + strength + "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + "(100%)";
      }else {

        document.getElementById("PasswordStrength").innerHTML = "🟢 " + strength + "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + " (" + strengthValue.toFixed(2) + "%)";
      }
    }
  });
}

//?DONE todo: Optimize the CopyPass from 5 to 1 function.
//Copying specific passwords from the most-recent list & display
function CopyPass(id) {
  var copyIn = document.getElementById(id);

  if(copyIn.value !== "") {

    copyIn.select();
    copyIn.setSelectionRange(0, 999999);
    navigator.clipboard.writeText(copyIn.value);
    
    alert("Password copied to clipboard ✔️");
  }else {

    alert("Please click to generate a password first.❌");
    return;
  }
}

//?DONE todo: Optimize the RemovePass from 5 to 1 function.
//Removing specific passwords from the most-recent list & display
function RemovePass(index) {
  var pass1 = document.getElementById('Fpass1');
  var pass2 = document.getElementById('Fpass2');
  var pass3 = document.getElementById('Fpass3');
  var pass4 = document.getElementById('Fpass4');
  var pass5 = document.getElementById('Fpass5');
  var display = document.getElementById('display');

  if(index == 1) {

    pass1.value = pass2.value;
    pass2.value = pass3.value;
    pass3.value = pass4.value;
    pass4.value = pass5.value;
    pass5.value = "";
  }else if(index == 2) {

    pass2.value = pass3.value;
    pass3.value = pass4.value;
    pass4.value = pass5.value;
    pass5.value = "";
  }else if(index == 3) {

    pass3.value = pass4.value;
    pass4.value = pass5.value;
    pass5.value = "";
  }else if(index == 4) {

    pass4.value = pass5.value;
    pass5.value = "";
  }else if(index == 5) {

    pass5.value = "";
  } else if(index == 0) {

    display.value = "";
  }

  recentPasswords[0] = pass5.value;
  recentPasswords[1] = pass4.value;
  recentPasswords[2] = pass3.value;
  recentPasswords[3] = pass2.value;
  recentPasswords[4] = pass1.value;
}

function RemovePastedPass() {

  document.getElementById("AppliedPass").value = "";
  document.getElementById("PasswordStrength").innerHTML = ""; // clear the password strength element
}
