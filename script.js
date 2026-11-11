const products = [
 {id:"monitor",category:"Monitore",name:"Gaming-Monitor",desc:"Für ein klares, flüssiges Bild.",price:299.99,icon:"▣"},
 {id:"headset",category:"Headsets",name:"Wireless-Headset",desc:"Komfortabler Sound für lange Sessions.",price:129.99,icon:"♫"},
 {id:"chair",category:"Stühle",name:"Gaming-Stuhl",desc:"Ergonomischer Komfort für deinen Platz.",price:219.99,icon:"♜"},
 {id:"controller",category:"Controller",name:"Wireless-Controller",desc:"Präzise Steuerung und gutes Handling.",price:69.99,icon:"◉"},
 {id:"keyboard",category:"Tastaturen",name:"Mechanische Tastatur",desc:"Kompakt, schnell und angenehm zu tippen.",price:89.99,icon:"⌨"},
 {id:"mouse",category:"Zubehör",name:"Gaming-Maus",desc:"Leichtes Design für präzise Bewegungen.",price:59.99,icon:"⌁"}
];
let saved = JSON.parse(localStorage.getItem("sunsetWishlist") || "[]");
let activeFilter = "Alle";
const grid = document.getElementById("product-grid");
const money = n => n.toLocaleString("de-DE",{style:"currency",currency:"EUR"});
function renderProducts(){
 let list = products.filter(p=>activeFilter==="Alle"||p.category===activeFilter);
 const sort = document.getElementById("sort").value;
 if(sort==="low") list.sort((a,b)=>a.price-b.price);
 if(sort==="high") list.sort((a,b)=>b.price-a.price);
 grid.innerHTML = list.map(p=>`<article class="product-card"><div class="product-art">${p.icon}</div><div class="product-info"><small>${p.category.toUpperCase()}</small><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="save-btn ${saved.includes(p.id)?"saved":""}" data-save="${p.id}" aria-label="Auf Merkliste setzen">${saved.includes(p.id)?"♥":"♡"}</button></div></div></article>`).join("");
 grid.querySelectorAll("[data-save]").forEach(btn=>btn.addEventListener("click",()=>toggleSaved(btn.dataset.save)));
}
function renderWishlist(){
 document.getElementById("saved-count").textContent=saved.length;
 const target=document.getElementById("wishlist-items");
 const items=products.filter(p=>saved.includes(p.id));
 target.innerHTML=items.length?items.map(p=>`<div class="wishlist-row"><span>${p.name} · ${money(p.price)}</span><button class="save-btn saved" data-remove="${p.id}" aria-label="Entfernen">×</button></div>`).join(""):`<p class="empty-state">Noch nichts gespeichert. Wähle im Shop das Herz bei einem Produkt.</p>`;
 target.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>toggleSaved(b.dataset.remove)));
}
function toggleSaved(id){saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];localStorage.setItem("sunsetWishlist",JSON.stringify(saved));renderProducts();renderWishlist();}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();}));
document.getElementById("sort").addEventListener("change",renderProducts);
let platform="PlayStation 5",priority="Bildqualität";
document.querySelectorAll(".platform").forEach(b=>b.addEventListener("click",()=>{platform=b.dataset.value;document.querySelectorAll(".platform").forEach(x=>x.classList.toggle("selected",x===b));}));
document.querySelectorAll(".priority").forEach(b=>b.addEventListener("click",()=>{priority=b.dataset.value;document.querySelectorAll(".priority").forEach(x=>x.classList.toggle("selected",x===b));}));
document.getElementById("config-submit").addEventListener("click",()=>{document.getElementById("config-result").textContent=`Deine Auswahl: ${platform} · Fokus: ${priority}. Schau dir im Shop die passenden Kategorien an. Preise und Kompatibilität bitte vor einem Kauf beim Händler prüfen.`;});
const toggle=document.querySelector(".menu-toggle"),nav=document.getElementById("main-nav");
toggle.addEventListener("click",()=>{nav.classList.toggle("open");toggle.setAttribute("aria-expanded",nav.classList.contains("open"));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
renderProducts();renderWishlist();
