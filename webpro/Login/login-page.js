/*
var data = {
    "user":"cchaudhari1196@gmail.com",
    "pass":"Chirag@1196"
}
*/
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

localStorage.setItem("address","7, Nand Nagar, Mohadi Roada, Jalgaon")
console.log(localStorage.getItem("address"))


loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById("username-field").value;
    const password = document.getElementById("Password-field").value;
    // var data = new FormData();
    // data.append('user', username);
    // data.append('pass', password);
    const data = {
        "user":username,
        "pass":password
    }
    const xhttp = new XMLHttpRequest();
    
    // Define a callback function
    xhttp.onload = function() {
        const response = JSON.parse(this.response)
        if(this.status != 200){
            const error = document.getElementById("login-error-msg");
            error.style.opacity=1
            return;
        }
        if(response["isValid"] != true){
            const error = document.getElementById("login-error-msg");
            error.style.opacity=1
            error.innerText="Wrong Username or Password!!!"
            return;
        }
        localStorage.setItem("user",JSON.stringify(response.user))
        window.location.href="./../index.html"
    }
    
    // Send a request
    xhttp.open("POST", "http://localhost:8000/users/validate");

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));
})

