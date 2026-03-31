fetch(API+"/products")

.then(res=>res.json())

.then(data=>{

let menu=document.getElementById("menu");

data.forEach(p=>{

menu.innerHTML+=`

<div>

<h3>${p.name}</h3>
<p>₹ ${p.price}</p>

<button onclick="addToCart(${p.id})">
Add to cart
</button>

</div>

`;

});

});

function addToCart(id){

fetch(API+"/cart/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
productId:id,
quantity:1
})

});

alert("Added");

}