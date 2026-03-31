fetch("http://localhost:8080/api/cart/1")

.then(res=>res.json())

.then(data=>{

let cart=document.getElementById("cart");

data.forEach(i=>{

cart.innerHTML+=`

<p>

${i.product.name}

Qty: ${i.quantity}

</p>

`;

});

});

function placeOrder(){

fetch("http://localhost:8080/api/orders",{

method:"POST"

});

window.location="orders.html";

}