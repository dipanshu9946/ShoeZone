// const signupform = document.getElementById("signup-page");
const signupButton = document.getElementById("signup-form-submit");
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}
function isNumeric(value) {
  return /^-?\d+$/.test(value);
}
// const password1 = document.getElementById("signup-Password1-field");
// password1.addEventListener("change", (e)=>{
//     const password = document.getElementById("signup-Password-field").value;
//     let errorMsg = document.getElementById("password-error-msg");
//     if(password!= password1){
//         errorMsg.style.opacity = 1;
//     }else{
//         errorMsg.style.opacity = 0;
//     }
// } )

signupButton.addEventListener("click", (e) => {
  e.preventDefault();

  const firstname = document.getElementById("signup-firstname-field").value;
  if (firstname == null || firstname == undefined || firstname.trim() == "") {
    alert("Enter Valid Name");
    return;
  }

  const lastname = document.getElementById("signup-lastname-field").value;
  if (lastname == null || lastname == undefined || lastname.trim() == "") {
    alert("Enter Valid Name");
    return;
  }

  const username = document.getElementById("signup-username-field").value;
  if (!ValidateEmail(username)) {
    return;
  }

  const number = document.getElementById("signup-number-field").value;
  if (!isNumeric(number) || number.length != 10) {
    alert("Enter Valid Phone Number");
    return;
  }

  const address = document.getElementById("signup-address-field").value;
  if (address.length < 10) {
    alert("Enter valid Address");
    return;
  }

  const password = document.getElementById("signup-password-field").value;
  if (password.length <= 8) {
    alert("Enter Strong Password");
    return;
  }

  const password1 = document.getElementById("signup-password1-field").value;
  if (password1.length <= 8) {
    alert("Enter Strong Password");
    return;
  }

  data = {
    firstName: firstname,
    lastName: lastname,
    email: username,
    phone: number,
    description: "Some",
    address: address,
    password: password,
  };
  const xhttp = new XMLHttpRequest();

  // Define a callback function
  xhttp.onload = function () {
    console.log(this);
  };

  // Send a request
  xhttp.open("POST", "http://localhost:8000/users/");

  xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Content-type", "application/json");

  xhttp.send(JSON.stringify(data));
  alert("You have successfully Registered.");
  // location.reload();

  // window.location.href = "Login/login-page.html";
});
