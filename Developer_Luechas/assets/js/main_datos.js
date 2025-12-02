// Traducción de columnas
const traducciones = {
  "Entity": "País / Entidad",
  "Code": "Código",
  "Year": "Año",
  "Geo Biomass Other - TWh": "Geotermia, Biomasa y Otros – TWh",
  "Solar Generation - TWh": "Generación Solar – TWh",
  "Wind Generation - TWh": "Generación Eólica – TWh",
  "Hydro Generation - TWh": "Generación Hidroeléctrica – TWh"
};

// Crear encabezados traducidos
function crearEncabezados(columnas) {
  const head = document.getElementById("tabla-head");
  head.innerHTML = "";
  
  let tr = document.createElement("tr");

  columnas.forEach(col => {
    let th = document.createElement("th");

    th.textContent = traducciones[col] ?? col; // si no existe traducción, usa el nombre original
    tr.appendChild(th);
  });

  head.appendChild(tr);
}
