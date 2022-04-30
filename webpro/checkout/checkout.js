const xhttp = new XMLHttpRequest();

var buyBtn = document.getElementsByClassName("btn")[0];
buyBtn.addEventListener("click", buyButtonClicked);

var order = JSON.parse(localStorage.getItem("order"));

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function buyButtonClicked(e) {
  e.preventDefault();

  const firstname = document.getElementById("fname").value;
  if (firstname == null || firstname == undefined || firstname.trim() == "") {
    alert("Enter Valid first Name");
    return;
  }
  order.firstname = firstname;

  const lastname = document.getElementById("lname").value;
  if (lastname == null || lastname == undefined || lastname.trim() == "") {
    alert("Enter Valid Name");
    return;
  }
  order.lastname = lastname;

  const address = document.getElementById("adr").value;
  if (address.length < 10) {
    alert("Enter valid Address");
    return;
  }
  order.address = address;

  const phonenumber = document.getElementById("phone-n").value;
  if (!isNumeric(phonenumber) || phonenumber.length != 10) {
    alert("Enter Valid Phone Number");
    return;
  }
  order.phonenumber = phonenumber;

  console.log(order);
  xhttp.open("POST", "http://localhost:8000/orders/create");

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(order));

  /*--------remove ordered products after successful order---------- */
  var cartContent = document.getElementsByClassName("cart-content")[0];
  // while (cartContent.hasChildNodes()) {
  //   /cartContent.removeChild(cartContent.firstChild);
  // }
  window.location.href = "./../index.html";
}
