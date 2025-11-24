// ===============================
//  Selección de elementos
// ===============================
const tituloPrincipalEl = document.getElementById("titulo-principal");
const botonesContenedor = document.getElementById("botones-contenedor");

const tituloEl = document.querySelector(".card-title");
const descripcionEl = document.querySelector(".card-text");
let iconoEl = document.getElementById("energia-icono");
const subtituloEl = document.querySelector(".card-subtitle");
const estrellasEl = document.getElementById("estrellas");

// Listas dinámicas
const beneficiosList = document.getElementById("beneficios-list");
const datosList = document.getElementById("datos-list");
const colombiaList = document.getElementById("colombia-list");

// Wide card: se poblada por la función cargarEnergia() cuando se carga una energía

// loadSvg(path)
// - Descarga un SVG y devuelve el nodo <svg> listo para insertar.
// - Normaliza fills a `currentColor` para que el SVG pueda tintarse por CSS.
async function loadSvg(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return null;
    // Normalizar para permitir control por CSS: usar currentColor
    svg.removeAttribute("xmlns:a");
    // Reemplazar fills fijos por currentColor para poder colorear con CSS
    svg.querySelectorAll("[fill]").forEach((el) => {
      el.setAttribute("fill", "currentColor");
    });
    svg.setAttribute("focusable", "false");
    svg.setAttribute("aria-hidden", "true");
    return svg;
  } catch (e) {
    // Si fetch falla (p. ej. al abrir vía file:// en algunos navegadores),
    // devolvemos null y el código llamante hará fallback a <img src="...">.
    console.warn("loadSvg: no se pudo cargar", path, e);
    return null;
  }
}

// ===============================
//  TÍTULO PRINCIPAL
// ===============================
// Asigna el texto principal (variable `tituloPrincipal`) al elemento del DOM
tituloPrincipalEl.textContent = tituloPrincipal;

// ===============================
//  GENERAR BOTONES DINÁMICOS
//  Crea un botón por cada energía y monta el icono (SVG inline o <img>).
//  El SVG inline permite cambiar el color usando `currentColor`.
// ===============================
Object.keys(energias).forEach((tipo) => {
  const btn = document.createElement("button");
  btn.classList.add("energia-btn");
  btn.dataset.energia = tipo;
  // Crear wrapper para icono y texto
  const iconWrap = document.createElement("span");
  iconWrap.classList.add("btn-icon-wrap");
  // Intentar insertar SVG inline (si el recurso es .svg), si no fallback a <img>
  (async () => {
    const path = energias[tipo].icono || "";
    if (path.toLowerCase().endsWith(".svg")) {
      const svg = await loadSvg(path);
      if (svg) {
        svg.classList.add("btn-svg");
        svg.style.width = "18px";
        svg.style.height = "18px";
        // Aplicar color del icono directamente al SVG (variable local) para que
        // pueda ser controlado independientemente del texto del botón.
        svg.style.setProperty("--btn-icon-color", energias[tipo].color);
        iconWrap.appendChild(svg);
      } else {
        const img = document.createElement("img");
        img.src = path;
        img.alt = energias[tipo].nombre + " icon";
        img.classList.add("btn-icon");
        iconWrap.appendChild(img);
      }
    } else {
      const img = document.createElement("img");
      img.src = path;
      img.alt = energias[tipo].nombre + " icon";
      img.classList.add("btn-icon");
      iconWrap.appendChild(img);
    }
  })();

  const txt = document.createTextNode(" " + energias[tipo].nombre);
  btn.appendChild(iconWrap);
  btn.appendChild(txt);

  // Estilo base: fondo blanco y texto oscuro
  btn.style.backgroundColor = "#ffffff";
  btn.style.color = "#000";

  botonesContenedor.appendChild(btn);
});

// Botones ya generados
const botones = document.querySelectorAll(".energia-btn");

// cargarEnergia(tipo)
// - Actualiza la interfaz completa según `tipo`.
// - Pasos: setear variables CSS, actualizar textos, iconos, listas,
//   estrellas y estilos dinámicos (fondos y bordes).
function cargarEnergia(tipo) {
  const data = energias[tipo];
  // Asegurar variable CSS principal
  document.documentElement.style.setProperty("--energia-color", data.color);

  // hexToRgba(hex, alpha)
  // - Convierte '#rrggbb' en 'rgba(r,g,b,a)'. Usada para fondos/bordes con opacidad.
  function hexToRgba(hex, alpha) {
    const h = hex.replace("#", "");
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  tituloEl.textContent = data.titulo;
  subtituloEl.textContent = data.subtitulo;
  descripcionEl.textContent = data.descripcion;

  iconoEl.src = data.icono || "";
  iconoEl.alt = data.titulo || "";

  // Si el recurso es un SVG, intentar cargarlo inline y reemplazar el <img>
  if (data.icono && data.icono.toLowerCase().endsWith(".svg")) {
    (async () => {
      const svg = await loadSvg(data.icono);
      if (svg) {
        // mantener el mismo id para estilos
        svg.id = "energia-icono";
        svg.classList.add("hero-svg");
        // reemplazar el elemento actual por el svg inline
        iconoEl.replaceWith(svg);
        // actualizar la referencia para aplicar estilos dinámicos a continuación
        iconoEl = document.getElementById("energia-icono");
        // asegurar que el svg herede color
        iconoEl.style.color = data.color;
      }
    })();
  }

  // Aplicar estilo dinámico al icono principal (fondo suave con el color de la energía)
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

  // Estrellas
  // Estrellas: base gris + capa coloreada que se recorta según la puntuación
  // Soporta medias estrellas mediante porcentaje
  const maxStars = 5;
  const filledPercent =
    Math.max(0, Math.min(1, data.estrellas / maxStars)) * 100;
  // Usamos dos capas con los mismos caracteres para garantizar alineación
  estrellasEl.innerHTML = `
    <div class="estrellas__wrap" aria-hidden="true">
      <div class="estrellas__base">${"★".repeat(maxStars)}</div>
      <div class="estrellas__fill" style="width: ${filledPercent}%">${"★".repeat(
    maxStars
  )}</div>
    </div>
  `;
  // Añadir atributo accesible
  estrellasEl.setAttribute(
    "aria-label",
    `${data.estrellas} de ${maxStars} estrellas`
  );

  // Listas dinámicas
  cargarLista(beneficiosList, data.beneficios);
  cargarLista(datosList, data.datos);
  cargarLista(colombiaList, data.colombia);

  // Wide card
  document.getElementById("wide-title").textContent = data.wide.titulo;
  document.getElementById("wide-text").textContent = data.wide.texto;
  // Intentar inlinear el icono de la wide card si es SVG, si no usar src normal
  const wideIconElCurrent = document.getElementById("wide-icon");
  if (
    data.wide &&
    data.wide.icono &&
    data.wide.icono.toLowerCase().endsWith(".svg")
  ) {
    (async () => {
      const svgWide = await loadSvg(data.wide.icono);
      if (svgWide) {
        svgWide.id = "wide-icon";
        svgWide.classList.add("wide-svg");
        wideIconElCurrent.replaceWith(svgWide);
      } else {
        // fallback a imagen
        wideIconElCurrent.src = data.wide.icono;
      }
      // aplicar estilos a lo que exista ahora
      const wideIconEl = document.getElementById("wide-icon");
      const wideCardEl = document.querySelector(".wide-card");
      if (wideIconEl) {
        wideIconEl.style.background = hexToRgba(data.color, 0.14);
        wideIconEl.style.padding = "10px";
        wideIconEl.style.borderRadius = "12px";
        wideIconEl.style.maxWidth = "80px";
        wideIconEl.style.boxSizing = "border-box";
        // si es svg inline permitir que tome currentColor
        wideIconEl.style.color = data.color;
      }
      if (wideCardEl) {
        wideCardEl.style.background = hexToRgba(data.color, 0.06);
        wideCardEl.style.border = `1px solid ${hexToRgba(data.color, 0.12)}`;
      }
    })();
  } else {
    // no es svg, asignar src directo y aplicar estilos
    if (wideIconElCurrent) wideIconElCurrent.src = data.wide.icono;
    const wideIconEl = document.getElementById("wide-icon");
    const wideCardEl = document.querySelector(".wide-card");
    if (wideIconEl) {
      wideIconEl.style.background = hexToRgba(data.color, 0.14);
      wideIconEl.style.padding = "10px";
      wideIconEl.style.borderRadius = "12px";
      wideIconEl.style.maxWidth = "80px";
      wideIconEl.style.boxSizing = "border-box";
    }
    if (wideCardEl) {
      wideCardEl.style.background = hexToRgba(data.color, 0.06);
      wideCardEl.style.border = `1px solid ${hexToRgba(data.color, 0.12)}`;
    }
  }
}

// cargarLista(contenedor, items)
// - Vacía un contenedor <ul> y añade <li> para cada elemento del array `items`.
function cargarLista(contenedor, items) {
  contenedor.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    contenedor.appendChild(li);
  });
}

// Eventos de botones
// - Añade el manejador click a cada botón que:
//   1) resetea estilos de los botones,
//   2) aplica el estado activo y variable CSS de color,
//   3) llama a `cargarEnergia`.
botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tipo = btn.dataset.energia;

    // Reset visual
    botones.forEach((b) => {
      b.style.backgroundColor = "#ffffff";
      b.style.color = "#000";
      b.classList.remove("active");
    });

    // Botón activo
    btn.style.backgroundColor = energias[tipo].color;
    // eliminar color inline para permitir que la clase .active controle el color (texto blanco)
    btn.style.color = "";
    btn.classList.add("active");

    // Variable CSS para color principal
    document.documentElement.style.setProperty(
      "--energia-color",
      energias[tipo].color
    );

    cargarEnergia(tipo);
  });
});

// Activar por defecto la energía que queremos mostrar al cargar
const tipoPorDefecto = "bioenergia";
// Buscar el botón y 'click' para reutilizar la lógica del evento
const btnPorDefecto = Array.from(botones).find(
  (b) => b.dataset.energia === tipoPorDefecto
);
if (btnPorDefecto) {
  btnPorDefecto.click();
} else {
  // Fallback: cargar solar si no se encuentra
  cargarEnergia("solar");
}
