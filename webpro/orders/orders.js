const xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:8000/orders/");
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send();

xhttp.onload = function () {
  const response = JSON.parse(this.response);
  user = JSON.parse(localStorage.getItem("user"));
  if (user == null || user == undefined) return;

  for (var order of response) {
    if ((order.user && order.user.id) != user.id) return;
    let orders = document.getElementById("orders");
    var time = new Date(order.createdAt).toLocaleDateString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
    orders.innerHTML =
      `
    <button class="accordion"><b>${order.firstname}</b> ordered on <b>${time}</b> At Address: <b>${order.address}</b> 
    <a style='float: right;' href='http://localhost:8000/orders/cancel/${order.id}'>Cancel The Order</a> </button>
    <div class="panel">
    <table id='table-${order.id}'>
        <tr>
          <th>Product Name</th>
          <th>Quanity</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </table>
    </div>` + orders.innerHTML;
    let productsTableRows = "";
    for (let product of order.products) {
      var templat = `<tr> 
        <td><a href="#">"${product.product.name}"</a></td>
        <td>${product.quantity}</td>        
        <td>$${
          (product.product.price && Number(product.product.price.slice(1))) *
          product.quantity
        }</td>
        <td>${order.status}</td>
      </tr>`;
      productsTableRows += templat;
    }

    var shopcontent = document.getElementById("table-" + order.id);
    shopcontent.innerHTML = shopcontent.innerHTML + productsTableRows;

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }
};
