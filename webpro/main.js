let productNameIdMap = new Map();
const xhttp = new XMLHttpRequest();
let productlist = [];
xhttp.open("GET", "http://localhost:8000/products/");
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send();

xhttp.onload = function () {
  const response = JSON.parse(this.response);

  for (var i = 0; i < response.length; i++) {
    // console.log(i);
    var product = response[i];

    var templat = `<div class="product-box">
        <img src="${product.image}" alt="" class="product-img">
        <h2 class="product-title">${product.name}</h2>
        <span class="price">${product.price}</span><br><br>
        <i class='bx bx-shopping-bag add-cart' id='add-cart${i}'></i>
        </div>`;
    productNameIdMap.set(product.name, product.id);

    var shopcontent = document.getElementsByClassName("shop-content")[0];
    shopcontent.innerHTML = templat + shopcontent.innerHTML;
  }
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
};

function checkIfAlreadyPresentInCart(title) {
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("You have already add this item to cart");
      return;
    }
  }
}

const userString = localStorage.getItem("user");
let user = null;

if (userString == null || userString.trim() == "") {
  document.getElementById("current-user").innerText = "";
} else {
  user = parseData(userString);
  document.getElementById("address-box").value = user ? user.address : "";
  document.getElementById("current-user").innerText = user ? user.name : "";
}

if (user) {
  document.getElementById("Logout").innerText = "Log Out";
} else {
  document.getElementById("Logout").innerText = "Log In";
}

function parseData(data) {
  if (!data) return {};
  if (typeof data === "object") return data;
  if (typeof data === "string") return JSON.parse(data);

  return {};
}
// cart
let Logout = document.querySelector("#Logout");
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let removeItem = document.querySelector("#remove-item");
var quantityInputs = document.getElementsByClassName("cart-quantity");

for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}
//logout
Logout.onclick = () => {
  localStorage.setItem("user", "");
  window.location.href = "./login/login-page.html";
};

//open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

removeItem &&
  (removeItem.onclick = (e) => {
    removeCartItem(e);
  });
//cart working js
if (document.readyState == "loading") {
  document.addEventListener("DOMcontentLoaded", ready);
} else {
  ready();
}

//making function
function ready() {
  //remove item from cart
  var reomveCartButtons = document.getElementsByClassName("cart-remove");
  console.log(reomveCartButtons);
  for (var i = 0; i < reomveCartButtons.length; i++) {
    var button = reomveCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //quantity change
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //
}
//Buy Button
function buyButtonClicked() {
  /*----------------------------------------------------*/

  // How to get User id
  let id = user ? user.id : null;
  if (id == null) {
    alert("Login is required to place the Order.");
    window.location.href = "./Login/login-page.html";
  }
  let address = document.getElementById("address-box").value;
  let price = document.getElementsByClassName("total-price")[0].innerText;
  let products = [];

  var cartItems = document.getElementsByClassName("cart-content")[0];
  var ItemsInCart = cartItems.getElementsByClassName("cart-product-title");
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < ItemsInCart.length; i++) {
    let productTitle = ItemsInCart[i].innerText;
    let product = {
      productId: productNameIdMap.get(productTitle),
      quantity: document.getElementById("quantity-" + productTitle).value,
    };
    products.push(product);
  }

  let data = {
    price: price,
    status: "IN PROGRESS",
    address: address,
    user: id,
    products: products,
  };

  localStorage.setItem("order", JSON.stringify(data));
}

// Buy Button work
document
  .getElementsByClassName("btn-buy")[0]
  .addEventListener("click", buyButtonClicked);

//remove item from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

//quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
//add to cart
async function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("You have already add this item to cart");
      return;
    }
  }
  var cartBoxContent = `
                            <img src="${productImg} " alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title" for="${title}">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" id="quantity-${title}" class="cart-quantity">
                            </div>
                            <!--remove cart-->
                            <i class='bx bxs-trash-alt cart-remove' id="remove-item"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

//update total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }

  //if price contain some cents value
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// -----------------------------------slideshow
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
