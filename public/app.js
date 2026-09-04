const products=[
 {id:'amethyst',name:'Amethyst Drake',price:49.99,image:'assets/amethyst.webp'},
 {id:'ocean',name:'Ocean Drake',price:49.99,image:'assets/ocean.webp'},
 {id:'forest',name:'Forest Drake',price:49.99,image:'assets/forest.webp'},
 {id:'frost',name:'Frost Drake',price:49.99,image:'assets/frost.webp'}
];
let cart=JSON.parse(localStorage.getItem('carbon3d-cart')||'[]');
const $=s=>document.querySelector(s);
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
function renderProducts(){ $('#product-grid').innerHTML=products.map(p=>`<article class="product-card"><img src="${p.image}" alt="${p.name} articulated 3D-printed dragon"><div class="product-info"><h3>${p.name}</h3><p class="price">${money(p.price)}</p><button class="add-button" data-id="${p.id}">Add to cart</button></div></article>`).join(''); }
function renderCart(){
 const items=$('.cart-items'), empty=$('.cart-empty');
 items.innerHTML=cart.map((id,i)=>{const p=products.find(x=>x.id===id);return `<div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><span>${money(p.price)}</span></div><button class="remove-item" data-index="${i}">Remove</button></div>`}).join('');
 empty.hidden=cart.length>0; $('.cart-count').textContent=cart.length;
 const total=cart.reduce((sum,id)=>sum+products.find(p=>p.id===id).price,0), remaining=Math.max(0,150-total);
 $('.subtotal').textContent=money(total); $('.shipping-message').textContent=remaining?`Add ${money(remaining)} more for free shipping.`:'You unlocked free shipping!';
 $('.progress-track span').style.width=`${Math.min(100,total/150*100)}%`; localStorage.setItem('carbon3d-cart',JSON.stringify(cart));
}
function openCart(open=true){$('.cart-drawer').classList.toggle('open',open);$('.cart-drawer').setAttribute('aria-hidden',String(!open));$('.cart-overlay').hidden=!open;document.body.style.overflow=open?'hidden':''}
function toast(message){const el=$('.toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800)}
renderProducts();renderCart();$('#year').textContent=new Date().getFullYear();
document.addEventListener('click',e=>{const add=e.target.closest('.add-button');if(add){cart.push(add.dataset.id);renderCart();toast('Dragon added to your cart');}const remove=e.target.closest('.remove-item');if(remove){cart.splice(Number(remove.dataset.index),1);renderCart();}});
$('.cart-button').addEventListener('click',()=>openCart());$('.cart-close').addEventListener('click',()=>openCart(false));$('.cart-overlay').addEventListener('click',()=>openCart(false));
$('.menu-toggle').addEventListener('click',e=>{const nav=$('.nav'),open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open))});
$('.checkout-button').addEventListener('click',()=>toast('Checkout will be connected before launch'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')openCart(false)});
