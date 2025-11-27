// ===============================
//  Selección de elementos del DOM
//  Estos son los elementos HTML que el script modificará dinámicamente
//  según la energía seleccionada.
// ===============================
const tituloPrincipalEl = document.getElementById("titulo-principal");
const botonesContenedor = document.getElementById("botones-contenedor");

const tituloEl = document.querySelector(".card-title");
const descripcionEl = document.querySelector(".card-text");
let iconoEl = document.getElementById("energia-icono"); // se reemplaza si el icono es SVG
const subtituloEl = document.querySelector(".card-subtitle");
const estrellasEl = document.getElementById("estrellas");

// Listas de las tarjetas dinámicas
const beneficiosList = document.getElementById("beneficios-list");
const datosList = document.getElementById("datos-list");
const colombiaList = document.getElementById("colombia-list");

// Wide card: se rellena dentro de cargarEnergia()

// ===================================================================
// loadSvg(path)
// Carga un archivo .svg desde una ruta, lo convierte a elemento <svg>
// y modifica sus atributos para permitir personalización por CSS.
// Esto permite cambiar color, tamaño y estilos del icono.
// ===================================================================
async function loadSvg(path) {
  try {
    const res = await fetch(path); // carga el archivo
    if (!res.ok) return null;

    const text = await res.text(); // contenido del SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return null;

    // Limpieza del SVG para evitar errores
    svg.removeAttribute("xmlns:a");

    // Normaliza los colores: reemplaza todos los fill por currentColor
    // para permitir color dinámico desde CSS o JS.
    svg.querySelectorAll("[fill]").forEach((el) => {
      el.setAttribute("fill", "currentColor");
    });

    svg.setAttribute("focusable", "false");
    svg.setAttribute("aria-hidden", "true");

    return svg;
  } catch (e) {
    console.warn("loadSvg: error al cargar →", path, e);
    return null;
  }
}

// ===============================
// TÍTULO PRINCIPAL
// Se inserta dinámicamente en el header del proyecto.
// ===============================
tituloPrincipalEl.textContent = tituloPrincipal;

// ===================================================================
// GENERACIÓN DE BOTONES DINÁMICOS
// Por cada energía del objeto "energias":
//  - crea un botón
//  - inserta icono (SVG inline si existe)
//  - asigna colores y dataset interno
// ===================================================================
Object.keys(energias).forEach((tipo) => {
  const btn = document.createElement("button");
  btn.classList.add("energia-btn");
  btn.dataset.energia = tipo; // indica el tipo que representa el botón

  // Contenedor del icono
  const iconWrap = document.createElement("span");
  iconWrap.classList.add("btn-icon-wrap");

  // Carga SVG inline si es posible
  (async () => {
    const path = energias[tipo].icono || "";

    if (path.toLowerCase().endsWith(".svg")) {
      const svg = await loadSvg(path);

      if (svg) {
        svg.classList.add("btn-svg");
        svg.style.width = "18px";
        svg.style.height = "18px";
        svg.style.setProperty("--btn-icon-color", energias[tipo].color);

        iconWrap.appendChild(svg);
      } else {
        const img = document.createElement("img");
        img.src = path;
        img.classList.add("btn-icon");
        iconWrap.appendChild(img);
      }
    } else {
      // PNG/JPG como fallback
      const img = document.createElement("img");
      img.src = path;
      img.classList.add("btn-icon");
      iconWrap.appendChild(img);
    }
  })();

  // Texto del botón
  btn.appendChild(iconWrap);
  btn.appendChild(document.createTextNode(" " + energias[tipo].nombre));

  // Estilos visuales por defecto
  btn.style.backgroundColor = "#ffffff";
  btn.style.color = "#000";

  botonesContenedor.appendChild(btn);
});

// Botones ya generados
const botones = document.querySelectorAll(".energia-btn");

// ===================================================================
// cargarEnergia(tipo)
// Actualiza **toda la interfaz** cuando el usuario selecciona un botón.
// Cambia textos, iconos, colores, listas, estrellas y wide-card.
// ===================================================================
function cargarEnergia(tipo) {
  const data = energias[tipo];

  // Variable CSS global para theming dinámico
  document.documentElement.style.setProperty("--energia-color", data.color);

  // Conversión HEX → RGBA para aplicar transparencia
  function hexToRgba(hex, alpha) {
    const h = hex.replace("#", "");
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Inserción de contenido principal
  tituloEl.textContent = data.titulo;
  subtituloEl.textContent = data.subtitulo;
  descripcionEl.textContent = data.descripcion;

  // Icono principal (fallback PNG)
  iconoEl.src = data.icono;
  iconoEl.alt = data.titulo;

  // Reemplazo por SVG inline si aplica
  if (data.icono.toLowerCase().endsWith(".svg")) {
    (async () => {
      const svg = await loadSvg(data.icono);
      if (svg) {
        svg.id = "energia-icono";
        svg.classList.add("hero-svg");

        iconoEl.replaceWith(svg);
        iconoEl = document.getElementById("energia-icono");

        iconoEl.style.color = data.color;
      }
    })();
  }

  // Estilo dinámico del icono principal
  const iconBg = hexToRgba(data.color, 0.12);
  const iconBorder = hexToRgba(data.color, 0.18);

  iconoEl.style.background = iconBg;
  iconoEl.style.padding = "18px";
  iconoEl.style.borderRadius = "14px";
  iconoEl.style.width = "120px";
  iconoEl.style.height = "120px";
  iconoEl.style.display = "inline-flex";
  iconoEl.style.alignItems = "center";
  iconoEl.style.justifyContent = "center";
  iconoEl.style.objectFit = "contain";
  iconoEl.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)";
  iconoEl.style.border = `1px solid ${iconBorder}`;

  // Sistema de estrellas (⭐ con clip dinámico)
  const maxStars = 5;
  const filledPercent = (data.estrellas / maxStars) * 100;

  estrellasEl.innerHTML = `
    <div class="estrellas__wrap">
      <div class="estrellas__base">${"★".repeat(maxStars)}</div>
      <div class="estrellas__fill" style="width: ${filledPercent}%;">
        ${"★".repeat(maxStars)}
      </div>
    </div>
  `;

  estrellasEl.setAttribute(
    "aria-label",
    `${data.estrellas} de ${maxStars} estrellas`
  );

  // Listas dinámicas
  cargarLista(beneficiosList, data.beneficios);
  cargarLista(datosList, data.datos);
  cargarLista(colombiaList, data.colombia);

  // Wide card final
  document.getElementById("wide-title").textContent = data.wide.titulo;
  document.getElementById("wide-text").textContent = data.wide.texto;

  const wideIconCurrent = document.getElementById("wide-icon");

  // Inline SVG para wide-card
  if (data.wide.icono.toLowerCase().endsWith(".svg")) {
    (async () => {
      const svg = await loadSvg(data.wide.icono);
      if (svg) {
        svg.id = "wide-icon";
        svg.classList.add("wide-svg");
        wideIconCurrent.replaceWith(svg);
      }

      const wideIcon = document.getElementById("wide-icon");
      const wideCard = document.querySelector(".wide-card");

      wideIcon.style.background = hexToRgba(data.color, 0.14);
      wideIcon.style.padding = "10px";
      wideIcon.style.borderRadius = "12px";
      wideIcon.style.maxWidth = "80px";
      wideIcon.style.color = data.color;

      wideCard.style.background = hexToRgba(data.color, 0.06);
      wideCard.style.border = `1px solid ${hexToRgba(data.color, 0.12)}`;
    })();
  } else {
    // fallback PNG/JPG
    wideIconCurrent.src = data.wide.icono;
  }
}

// ===================================================================
// cargarLista()
// Rellena una <ul> con elementos <li> creados a partir de un array.
// ===================================================================
function cargarLista(contenedor, items) {
  contenedor.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    contenedor.appendChild(li);
  });
}

// ===================================================================
// EVENTOS DE BOTONES
// Maneja el estilo del botón activo y carga la energía seleccionada.
// ===================================================================
botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tipo = btn.dataset.energia;

    // Resetea estilo de todos los botones
    botones.forEach((b) => {
      b.style.backgroundColor = "#ffffff";
      b.style.color = "#000";
      b.classList.remove("active");
    });

    // Aplica estilo al seleccionado
    btn.style.backgroundColor = energias[tipo].color;
    btn.style.color = "#fff"; // texto del botón en blanco cuando está activo
    btn.classList.add("active");

    // Actualiza variable CSS global
    document.documentElement.style.setProperty(
      "--energia-color",
      energias[tipo].color
    );

    // Cargar contenido
    cargarEnergia(tipo);
    // Re-evaluar si la tarjeta principal tiene contenido extra (mostrar indicador)
    setTimeout(updateSolarCardOverflow, 120); // small delay to allow DOM changes
  });
});

// ===================================================================
// Selección por defecto al iniciar la página
// ===================================================================
const tipoPorDefecto = "bioenergia";

const btnPorDefecto = [...botones].find(
  (b) => b.dataset.energia === tipoPorDefecto
);

// Simula click en la energía inicial
if (btnPorDefecto) btnPorDefecto.click();
else cargarEnergia("solar");

// -------------------------------
// Overflow helpers for solar-card
// -------------------------------
const solarCard = document.querySelector(".solar-card");

function updateSolarCardOverflow() {
  if (!solarCard) return;
  const hasMore = solarCard.scrollHeight > solarCard.clientHeight + 3;
  if (hasMore) {
    solarCard.classList.add("has-more");
    solarCard.classList.remove("at-bottom");
  } else {
    solarCard.classList.remove("has-more");
    solarCard.classList.remove("at-bottom");
  }
}

// Track scrolling inside the card to hide the micro-indicator when the user
// reaches the bottom.
if (solarCard) {
  solarCard.addEventListener("scroll", () => {
    const atBottom =
      solarCard.scrollTop + solarCard.clientHeight >=
      solarCard.scrollHeight - 4;
    if (atBottom) {
      solarCard.classList.add("at-bottom");
      solarCard.classList.remove("has-more");
    } else {
      solarCard.classList.remove("at-bottom");
      if (solarCard.scrollHeight > solarCard.clientHeight + 3)
        solarCard.classList.add("has-more");
    }
  });
}

// Re-evaluate on resize / load
window.addEventListener("load", updateSolarCardOverflow);
window.addEventListener("resize", () =>
  setTimeout(updateSolarCardOverflow, 80)
);

// ===================================================================
// ¡CORRECCIÓN CRÍTICA! Evitar scroll con barra espaciadora
// Solución 100% efectiva para todos los navegadores
// ===================================================================
document.addEventListener('keydown', function(e) {
  // Solo actúa para la barra espaciadora
  if (e.key !== ' ') return;
  
  // Elementos donde SÍ queremos permitir la barra espaciadora
  const interactiveElements = [
    'INPUT', 
    'TEXTAREA', 
    'SELECT', 
    'BUTTON', 
    'A', 
    '[contenteditable="true"]'
  ];
  
  // Si el elemento actual es interactivo, permitimos el comportamiento normal
  if (interactiveElements.some(selector => e.target.matches(selector))) {
    return;
  }
  
  // ¡BLOQUEAMOS EL SCROLL GLOBAL!
  e.preventDefault();
  
  // Opcional: Simular scroll dentro de .solar-card si está presente
  const solarCard = document.querySelector('.solar-card');
  if (solarCard) {
    solarCard.scrollTop += window.innerHeight * 0.8;
  }
}, true); // ¡Importante: usar capture phase!