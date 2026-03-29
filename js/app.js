const menu = document.getElementById("menu");
const contCategorias = document.getElementById("categorias");

let categoriaActiva = "";

// 👉 agrupar productos
function agruparCategorias() {
  const categorias = {};

  CONFIG.productos.forEach(p => {
    if (!categorias[p.categoria]) {
      categorias[p.categoria] = [];
    }
    categorias[p.categoria].push(p);
  });

  return categorias;
}

// 👉 precios
function generarPrecio(p) {

  if (p.precioChico && p.precioGrande) {
    return `
      <div class="flex gap-4 text-sm">

        <div class="text-right">
          <div class="font-semibold text-amber-700">${p.precioChico}</div>
          <div class="text-[10px] text-gray-400">16 oz</div>
        </div>

        <div class="text-right">
          <div class="font-semibold text-amber-700">${p.precioGrande}</div>
          <div class="text-[10px] text-gray-400">20 oz</div>
        </div>

      </div>
    `;
  }

  return `<span class="text-amber-700 font-semibold">${p.precio || ""}</span>`;
}

// 👉 render categorías
function renderCategorias() {

  contCategorias.innerHTML = CONFIG.categorias.map(cat => `
    <button onclick="cambiarCategoria('${cat}')"
      class="px-4 py-2 rounded-full text-sm whitespace-nowrap
      ${categoriaActiva === cat ? 
        'bg-amber-500 text-white' : 
        'bg-white text-gray-700'}
      shadow-sm transition">
      ${cat}
    </button>
  `).join("");
}

// 👉 render productos (CON IMAGEN)
function renderProductos() {

  const categorias = agruparCategorias();
  const productos = categorias[categoriaActiva] || [];

  menu.innerHTML = `
    <div class="grid sm:grid-cols-2 gap-4">

      ${productos.map(p => `
        
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">

          ${p.imagen ? `
            <img src="${p.imagen}" 
                 class="w-full h-40 object-cover">
          ` : ""}

          <div class="p-4 flex justify-between items-start">

            <div>
              <h4 class="font-medium">${p.nombre}</h4>
              <p class="text-xs text-gray-400 mt-1">${p.descripcion || ""}</p>
            </div>

            ${generarPrecio(p)}

          </div>

        </div>

      `).join("")}

    </div>
  `;
}

// 👉 cambiar categoría
function cambiarCategoria(cat) {
  categoriaActiva = cat;
  renderCategorias();
  renderProductos();
}

// 👉 init
function init() {

  document.getElementById("nombre").textContent = CONFIG.nombre;

  const mensaje = "Hola! Quiero hacer un pedido 👋";
  const wsp = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;

  const btnWsp = document.getElementById("btnWsp");
  if (btnWsp) btnWsp.href = wsp;

  const btnHero = document.getElementById("btnHero");
  if (btnHero) btnHero.href = wsp;

  categoriaActiva = CONFIG.categorias[0];

  renderCategorias();
  renderProductos();
}

init();