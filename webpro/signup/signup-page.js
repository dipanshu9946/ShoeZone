// const signupform = document.getElementById("signup-page");
const signupButton = document.getElementById("signup-form-submit");


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
    const lastname = document.getElementById("signup-lastname-field").value;
    const username = document.getElementById("signup-username-field").value;
    const number = document.getElementById("signup-number-field").value;
    const address = document.getElementById("signup-address-field").value;
    const password = document.getElementById("signup-password-field").value;
    const password1 = document.getElementById("signup-password1-field").value;

    data = {
        firstName: firstname,
        lastName: lastname,
        email: username,
        phone: number,
        description: "Some",
        address: address,
        password:password
    }
    const xhttp = new XMLHttpRequest();
    
    // Define a callback function
    xhttp.onload = function() {
        console.log(this)
    }
    
    // Send a request
    xhttp.open("POST", "http://localhost:8000/users/");


    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*'); 
    xhttp.setRequestHeader('Content-type', 'application/json')



    xhttp.send(JSON.stringify(data));
    alert("You have successfully Registered.");
    // location.reload();
})
