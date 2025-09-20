/* script.js
 - load data/products.json
 - render navbar logos, product grid, game select, paket list
 - search & category filter
 - handle paket selection + WA checkout
*/

// config WA number
const WA_NUMBER = "6283170869295"; // tanpa + / 0, sesuai link wa.me

let PRODUCTS = [];   // all products from JSON
let currentGame = null;
let selectedPackage = null;

// helper: fetch json (works on server or hosting)
async function loadProducts(){
  try {
    const res = await fetch("data/products.json");
    const data = await res.json();
    PRODUCTS = data.games || [];
    initUI();
  } catch(err){
    console.error("Gagal load products.json:", err);
    document.getElementById("product-grid").innerHTML = "<p class='muted'>Gagal memuat produk. Pastikan Anda menjalankan lewat server (Live Server / GitHub Pages).</p>";
  }
}

function initUI(){
  renderNavbar();
  renderCategoryOptions();
  renderGameSelect();
  renderProductGrid(PRODUCTS);
  setupSearch();
  setupCheckout();
}

// Navbar (logos)
function renderNavbar(){
  const nav = document.getElementById("game-navbar");
  nav.innerHTML = "";
  PRODUCTS.forEach((g, idx) => {
    const img = document.createElement("img");
    img.src = g.logo; img.alt = g.name;
    img.title = g.name;
    img.onclick = ()=> pickGameByIndex(idx);
    nav.appendChild(img);
  });
}

// product grid (cards)
function renderProductGrid(list){
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  if(!list.length){
    grid.innerHTML = "<p class='muted'>Tidak ada produk untuk kriteria ini.</p>";
    return;
  }
  list.forEach((g, idx) => {
    const div = document.createElement("div"); div.className = "product";
    div.innerHTML = `
      <img src="${g.logo}" alt="${g.name}" />
      <div class="meta">
        <h3>${g.name}</h3>
        <p>${g.category || "Game / Layanan"} • ${g.packages.length} paket</p>
      </div>
      <div class="tag">Pilih</div>
    `;
    div.onclick = ()=> pickGameByIndex(idx);
    grid.appendChild(div);
  });
}

// fill game select (right column)
function renderGameSelect(){
  const sel = document.getElementById("gameSelect");
  sel.innerHTML = "";
  const optAll = document.createElement("option"); optAll.value=""; optAll.textContent="-- Pilih Game/Layanan --";
  sel.appendChild(optAll);
  PRODUCTS.forEach((g, idx)=>{
    const o = document.createElement("option");
    o.value = idx; o.textContent = g.name;
    sel.appendChild(o);
  });
  sel.onchange = function(){ const idx = this.value; if(idx!==""){ pickGameByIndex(Number(idx)); } }
}

// show paket list for selected game
function showPackagesFor(game){
  currentGame = game;
  document.getElementById("gameTitle").innerText = game.name;
  document.getElementById("gameSubtitle").innerText = (game.description || "Pilih paket lalu isi ID / email untuk layanan premium.");

  // render paket
  const list = document.getElementById("paketList");
  list.innerHTML = "";
  if(!game.packages || !game.packages.length){
    list.innerHTML = "<p class='muted'>Tidak ada paket tersedia.</p>"; return;
  }
  game.packages.forEach((p, i)=>{
    const div = document.createElement("div");
    div.className = "paket";
    div.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
      <div><strong>${p.name}</strong><div class="muted" style="font-size:12px">${p.desc || ""}</div></div>
      <div style="text-align:right">${p.price}</div>
    </div>`;
    div.onclick = ()=>{
      document.querySelectorAll(".paket").forEach(x=>x.classList.remove("active"));
      div.classList.add("active");
      selectedPackage = p;
      document.getElementById("chosenPackage").innerText = p.name;
      document.getElementById("chosenPrice").innerText = p.price;
    };
    list.appendChild(div);
  });

  // pre-select first paket (optional)
  // document.querySelectorAll(".paket")[0]?.click();
}

// when user clicks product or navbar image
function pickGameByIndex(idx){
  const game = PRODUCTS[idx];
  if(!game) return;
  // set select
  document.getElementById("gameSelect").value = idx;
  showPackagesFor(game);
  // scroll to order
  document.getElementById("order-card").scrollIntoView({behavior:"smooth", block:"center"});
}

// search setup
function setupSearch(){
  const input = document.getElementById("search");
  input.oninput = function(){
    const q = (this.value||"").toLowerCase().trim();
    const category = document.getElementById("categoryFilter").value;
    const filtered = PRODUCTS.filter(g=>{
      const inCat = (category==="all") || (g.category===category);
      return inCat && (g.name.toLowerCase().includes(q) || (g.tags||[]).join(" ").toLowerCase().includes(q));
    });
    renderProductGrid(filtered);
  };
  // category change
  document.getElementById("categoryFilter").onchange = function(){
    input.dispatchEvent(new Event('input'));
  };
}

// category dropdown from products
function renderCategoryOptions(){
  const cats = new Set();
  PRODUCTS.forEach(g => g.category && cats.add(g.category));
  const sel = document.getElementById("categoryFilter");
  // clear except 'all'
  sel.innerHTML = '<option value="all">Semua</option>';
  Array.from(cats).sort().forEach(c=>{
    const o = document.createElement("option"); o.value=c; o.textContent=c; sel.appendChild(o);
  });
}

// checkout to WhatsApp
function setupCheckout(){
  document.getElementById("checkoutBtn").onclick = function(){
    const id = (document.getElementById("idInput").value||"").trim();
    if(!currentGame){ return alert("Pilih game / layanan terlebih dahulu!"); }
    if(!selectedPackage){ return alert("Pilih paket terlebih dahulu!"); }
    if(!id){ return alert("Masukkan ID / Email / Nomor untuk pengiriman (misal: ID Free Fire atau email Spotify)."); }

    const pesan = `Halo DikaPlay, saya ingin order:\n\nNama Layanan: ${currentGame.name}\nPaket: ${selectedPackage.name}\nHarga: ${selectedPackage.price}\nID/Email: ${id}\n\nMohon bantu proses.`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  };
}

// toggle theme (simple)
document.getElementById("toggleTheme")?.addEventListener("click", ()=>{
  document.documentElement.classList.toggle("light");
});

// initial load
window.addEventListener("DOMContentLoaded", ()=>{
  loadProducts();
  // init particles
  if(window.particlesJS){
    particlesJS("particles-js", {
      "particles": {
        "number": {"value": 50},
        "color": {"value": "#00e0ff"},
        "shape": {"type": "circle"},
        "opacity": {"value": 0.5},
        "size": {"value": 3},
        "line_linked": {"enable": true,"distance": 140,"color": "#00e0ff","opacity": 0.15,"width": 1},
        "move": {"enable": true,"speed": 2}
      }
    });
  }
});