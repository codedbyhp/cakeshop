let products = JSON.parse(localStorage.getItem('products')) || [
  { id:1, title:"Chocolate Cake", price:150, type:"cake", img:"images/chocolatecake.jpg", desc:"Rich chocolate cream cake" },
  { id:2, title:"Vanilla Cake", price:120, type:"cake", img:"images/vanillacake.jpg", desc:"Classic vanilla sponge" },
  { id:3, title:"Strawberry Cake", price:130, type:"cake", img:"images/strawberrycake.jpg", desc:"Fresh strawberry layers" },
  { id:4, title:"Fruit Cake", price:160, type:"cake", img:"images/fruitcake.jpg", desc:"Loaded with real fruits" },
  { id:5, title:"Pineapple Cake", price:140, type:"cake", img:"images/pineapplecake.jpg", desc:"Sweet & tangy pineapple" },
  { id:6, title:"Oreo Cake", price:155, type:"cake", img:"images/oreocake.jpg", desc:"Oreo cream crunch" },
  { id:7, title:"Biscuit Cake", price:100, type:"cake", img:"images/biscuitcake.jpg", desc:"Chocolate biscuit base" },

  { id:8, title:"Danish Pastry", price:50, type:"pastry", img:"images/danishpastry.jpg", desc:"Flaky buttery pastry" },
  { id:9, title:"Puff Pastry", price:30, type:"pastry", img:"images/puffpastry.jpg", desc:"Crispy puff layers" },
  { id:10, title:"BlackForest Pastry", price:90, type:"pastry", img:"images/blackforestpastry.jpg", desc:"Rich black forest mini" },
  { id:11, title:"RedVelvet Pastry", price:80, type:"pastry", img:"images/redvelvetpastry.jpg", desc:"Soft red velvet" },

  { id:12, title:"Donut", price:25, type:"cake", img:"images/donut.jpg", desc:"Soft sweet donut" }
];


localStorage.setItem('products', JSON.stringify(products));


let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();


function updateCartCount() {
  const els = document.querySelectorAll('#cart-count');
  els.forEach(el => el.innerText = cart.length);
}


function renderExclusive() {
  const container = document.getElementById('exclusive-cards');
  if (!container) return;
  const picks = products.slice(0,3);
  container.innerHTML = '';
  picks.forEach(p => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.desc || ''}</p>
      <div class="card-foot">
        <div class="price">₹${p.price}</div>
        <a class="btn small outline" href="cakes.html">View</a>
      </div>
    `;
    container.appendChild(card);
  });
}


function renderGridByType(type, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const list = products.filter(p => p.type === type);
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h4>${p.title}</h4>
      <div class="meta">${p.desc || ''}</div>
      <div class="price">₹${p.price}</div>
      <button class="btn primary" onclick="addToCart(${p.id})">Add to cart</button>
    `;
    container.appendChild(card);
  });
}

function validateContact() {
    let name = document.querySelector('input[placeholder="Your Name"]').value.trim();
    let email = document.querySelector('input[placeholder="Your Email"]').value.trim();
    let message = document.querySelector('textarea[placeholder="Your Message"]').value.trim();
    let msgBox = document.getElementById("contact-msg");

    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   
    if (name === "") {
        msgBox.style.color = "red";
        msgBox.textContent = "Please enter your name.";
        return;
    }

    if (!emailPattern.test(email)) {
        msgBox.style.color = "red";
        msgBox.textContent = "Please enter a valid email.";
        return;
    }

    if (message === "") {
        msgBox.style.color = "red";
        msgBox.textContent = "Please write your message.";
        return;
    }

   
    msgBox.style.color = "green";
    msgBox.textContent = "Message sent successfully! We will contact you soon.";

   
    document.querySelector('input[placeholder="Your Name"]').value = "";
    document.querySelector('input[placeholder="Your Email"]').value = "";
    document.querySelector('textarea[placeholder="Your Message"]').value = "";
}


function renderCartPage() {
  const container = document.getElementById('cart-page-items');
  if (!container) return;
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-page"><p>Your cart is empty.</p></div>';
    document.getElementById('cart-page-total').innerText = 0;
    return;
  }
  let total = 0;
  cart.forEach((it, idx) => {
    total += it.price;
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <div>${it.title}<div style="color:#7a6a5a;font-size:13px">${it.desc || ''}</div></div>
      <div>₹${it.price} <button onclick="removeFromCart(${idx})">Remove</button></div>
    `;
    container.appendChild(row);
  });
  document.getElementById('cart-page-total').innerText = total;
}


function renderCheckoutSummary() {
  const container = document.getElementById('checkout-summary');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = '<div class="checkout-summary">Your cart is empty.</div>';
    return;
  }
  let total = 0;
  let html = '<div class="checkout-summary"><ul>';
  cart.forEach(it => { total += it.price; html += `<li>${it.title} — ₹${it.price}</li>`; });
  html += `</ul><div style="margin-top:8px;font-weight:800">Total: ₹${total}</div></div>`;
  container.innerHTML = html;
}


function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  cart.push(p);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  const cartBtn = document.querySelector('.cart-link');
  if (cartBtn) cartBtn.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}], {duration:200});
}


function removeFromCart(idx) {
  cart.splice(idx,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  renderCartPage();
  renderCheckoutSummary();
}


function placeOrder() {
  const name = document.getElementById('cust-name')?.value?.trim();
  const phone = document.getElementById('cust-phone')?.value?.trim();
  const address = document.getElementById('cust-address')?.value?.trim();
  if (!name || !phone || !address) { alert('Please fill all details'); return; }
  const total = cart.reduce((s,i)=>s+i.price,0);
  alert(`Thank you ${name}! Your order of ₹${total} has been placed. We will contact you at ${phone}.`);
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  window.location.href = 'index.html';
}


document.addEventListener('DOMContentLoaded', () => {
  renderExclusive();
  renderGridByType('cake', 'cake-grid');     
  renderGridByType('cake', 'cake-grid');     
  renderGridByType('cake', 'cake-grid');     
  renderGridByType('cake', 'cake-grid');
  renderGridByType('cake', 'cake-products'); 

  renderGridByType('cake', 'cake-products'); 
  renderGridByType('pastry', 'pastry-grid');
  renderGridByType('pastry', 'pastry-products');

 
  renderGridByType('cake', 'cake-grid');
  renderGridByType('pastry', 'pastry-grid');
  renderCartPage();
  renderCheckoutSummary();
  updateCartCount();
});
