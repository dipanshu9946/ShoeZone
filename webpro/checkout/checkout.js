const xhttp = new XMLHttpRequest();

var buyBtn = document.getElementsByClassName("btn")[0];
buyBtn.addEventListener("click", buyButtonClicked);

var order = JSON.parse(localStorage.getItem("order"));

function buyButtonClicked(e) {
  e.preventDefault();
  const address = document.getElementById("adr").value;
  order.address = address;

  const phonenumber = document.getElementById("phone-n").value;
  order.phonenumber = phonenumber;

  const firstname = document.getElementById("fname").value;
  order.firstname = firstname;

  const lastname = document.getElementById("lname").value;
  order.lastname = lastname;

  console.log(order);
  xhttp.open("POST", "http://localhost:8000/orders/create");

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(order));

  /*--------remove ordered products after successful order---------- */
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  window.location.href = "./../index.html";
}
