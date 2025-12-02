// ==============================
//  CARGAR CSV CON PAPAPARSE
// ==============================
let datosCSV = [];

// Ruta del CSV (ya la estás usando)
const rutaCSV = "assets/data/Datos.csv";

Papa.parse(rutaCSV, {
  download: true,
  header: true,
  complete: (results) => {
    datosCSV = results.data;
    console.log("CSV cargado:", datosCSV);
  }
});

// ==============================
//  ELEMENTOS DEL DOM
// ==============================
const tablaHead = document.getElementById("tabla-head");
const tablaBody = document.getElementById("tabla-body");
const btnBuscar = document.getElementById("btn-buscar");

// ==============================
//  TRADUCCIONES DE COLUMNAS
// ==============================
const traducciones = {
  "Entity": "País / Entidad",
  "Code": "Código",
  "Year": "Año",
  "Geo Biomass Other - TWh": "Generacion bioenergia (TWh)",
  "Solar Generation - TWh": "Generación Solar (TWh)",
  "Wind Generation - TWh": "Generación Eólica (TWh)",
  "Hydro Generation - TWh": "Generación Hidroeléctrica (TWh)"
};

// ==============================
//  CREAR ENCABEZADOS TRADUCIDOS
// ==============================
function crearEncabezados(columnas) {
  tablaHead.innerHTML = "";
  const tr = document.createElement("tr");

  columnas.forEach(col => {
    const th = document.createElement("th");
    th.textContent = traducciones[col] || col;
    tr.appendChild(th);
  });

  tablaHead.appendChild(tr);
}

// ==============================
//  CREAR CUERPO DE TABLA
// ==============================
function crearFilasTabla(datos) {
  tablaBody.innerHTML = "";

  datos.forEach(row => {
    const tr = document.createElement("tr");

    Object.keys(row).forEach(col => {
      const td = document.createElement("td");
      td.textContent = row[col];
      tr.appendChild(td);
    });

    tablaBody.appendChild(tr);
  });
}

// ==============================
//  FUNCIÓN DE FILTRADO
// ==============================
function filtrarDatos() {
  const pais = document.getElementById("filtro-pais").value;
  const anio = document.getElementById("filtro-anio").value;

  let filtrados = datosCSV;

  // Filtrar por país si selecciona país
  if (pais !== "") {
    filtrados = filtrados.filter(d => d.Entity === pais);
  }

  // Filtrar por año si selecciona año
  if (anio !== "") {
    filtrados = filtrados.filter(d => d.Year === anio);
  }

  // Si no encuentra nada
  if (filtrados.length === 0) {
    tablaHead.innerHTML = "";
    tablaBody.innerHTML = `<tr><td colspan="7" class="text-center">No hay datos para esta búsqueda</td></tr>`;
    return;
  }

  // Crear tabla con columnas originales preservadas
  const columnas = Object.keys(filtrados[0]);

  crearEncabezados(columnas);
  crearFilasTabla(filtrados);
}

// ==============================
//  EVENTO DEL BOTÓN BUSCAR
// ==============================
btnBuscar.addEventListener("click", () => {
  filtrarDatos();

  // Hacer scroll suave hacia la tabla
  document.querySelector("#tabla-resultados").scrollIntoView({ behavior: "smooth" });
});
