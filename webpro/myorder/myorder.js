$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:8000/orders/");
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send();

// xhttp.onload = function () {
//   const response = JSON.parse(this.response);

//   for (var i = 0; i < response.length; i++) {
//     // console.log(i);
//     var product = response[i];

//     var templat = `<div class="product-box">
//         <img src="${product.image}" alt="" class="product-img">
//         <h2 class="product-title">${product.name}</h2>
//         <span class="price">${product.price}</span><br><br>
//         <i class='bx bx-shopping-bag add-cart' id='add-cart${i}'></i>
//         </div>`;
//     productNameIdMap.set(product.name, product.id);

//     var shopcontent = document.getElementsByClassName("shop-content")[0];
//     shopcontent.innerHTML = templat + shopcontent.innerHTML;
//   }
//   var addCart = document.getElementsByClassName("add-cart");
//   for (var i = 0; i < addCart.length; i++) {
//     let button = addCart[i];
//     button.addEventListener("click", addCartClicked);
//   }
// };

xhttp.onload = function () {
  const response = JSON.parse(this.response);

  for (var order = 0; order < response.length; order++) {
    for (let product of i.products) {
      var templat = ` <td><a href="#">"${product.product.name}"</a></td>
      <td>${product.quantity}</td>
      <td><span class="status text-success">&bull;</span> "${order.status}"</td>
      <td>${product.product.price * product.quantity}</td>
      <td><a href="#" class="view" title="View Details" data-toggle="tooltip"><i class="material-icons">&#xE5C8;</i></a></td>`;
      productNameIdMap.set(product.name, product.id);

      var shopcontent = document.getElementsByClassName("shop-content")[0];
      shopcontent.innerHTML = templat + shopcontent.innerHTML;
    }
    // console.log(i);
    var myorder = response[i];
  }
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
};
