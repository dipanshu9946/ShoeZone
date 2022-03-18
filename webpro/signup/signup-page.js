const signupform = document.getElementById("signup-page");
const signupButton = document.getElementById("signup-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name-field").value;
    const username = document.getElementById("signup-username-field").value;
    const password = document.getElementById("signup-Password-field").value;
    const password1 = document.getElementById("signup-Password1-field").value;

    data = {
        "user":username,
        "pass":password
    }
    const xhttp = new XMLHttpRequest();
    
    // Define a callback function
    xhttp.onload = function() {
        console.log("Slfslkdfjsd")
    }
    
    // Send a request
    xhttp.open("GET", "http://localhost:8000/users");


    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*'); 
    xhttp.setRequestHeader('Content-type', 'application/json')



    xhttp.send();
    alert("You have successfully logged in.");
    // location.reload();
})
