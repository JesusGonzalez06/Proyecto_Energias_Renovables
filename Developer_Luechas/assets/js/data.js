// ===============================================
// TÍTULO PRINCIPAL DEL COMPONENTE
// Se muestra en la cabecera de la sección.
// ===============================================
const tituloPrincipal = "Fuentes de Energía Renovable";


// ===============================================
// OBJETO PRINCIPAL "energias"
// Contiene toda la información de cada tipo de energía.
// Cada clave (solar, eolica, etc.) representa un tipo.
// Cada objeto interno incluye:
//  - nombre: cómo se mostrará en los botones
//  - color: color temático para UI dinámica
//  - icono: ruta del ícono principal
//  - titulo, subtitulo, estrellas: info del header
//  - descripcion: texto explicativo
//  - beneficios: lista superior
//  - datos: lista media
//  - colombia: lista inferior
//  - wide: tarjeta grande al final con icono y texto
// ===============================================
const energias = {
  solar: {
    // ------------------------------
    // Energía Solar
    // ------------------------------
    nombre: "Energia Solar",
    color: "#f7b543",               // Color temático para UI
    icono: "assets/icons/sun.svg",  // Icono principal para la tarjeta
    titulo: "Energía Solar",
    estrellas: 4,                   // Calificación visual
    subtitulo: "Crecimiento anual: +22%",
    descripcion:
      "La energía solar es una fuente renovable que aprovecha la radiación del sol para generar electricidad a través de paneles fotovoltaicos o para calentar fluidos en sistemas térmicos. Es una de las fuentes de energía más abundantes y limpias del planeta.",

    // Listas para tres tarjetas inferiores
    beneficios: [
      "Reducción de emisiones de CO2",
      "Menor contaminación del aire",
      "Independencia energética",
    ],

    datos: [
      "Costo reducido un 85% desde 2010",
      "Potencial global: 23,000 TW/año",
      "Eficiencia actual: 15-22%"
    ],

    colombia: [
      "Potencial solar: 1,200 kWh/m²/año",
      "uso creciente en zonas rurales",
      "queda mucho por explotar",
    ],

    // Tarjeta ancha adicional al final del contenido
    wide: {
      titulo: "Transición Energética Justa:",
      texto:
        "La implementación de fuentes renovables debe considerar no solo el aspecto técnico y económico, sino también los impactos sociales. Es fundamental garantizar que las comunidades locales se beneficien de estos proyectos y que se respete su territorio y cultura.",
      icono: "assets/icons/info_circle.svg",
    },
  },

  eolica: {
    // ------------------------------
    // Energía Eólica
    // ------------------------------
    nombre: "Energia Eólica",
    color: "#4a8cff",
    icono: "assets/icons/wind.svg",
    titulo: "Energía Eólica",
    estrellas: 5,
    subtitulo: "Capacidad global: 830 GW",
    descripcion:
      "La energía eólica aprovecha la fuerza del viento para generar electricidad mediante aerogeneradores. Es una de las fuentes de energía renovable de más rápido crecimiento en el mundo y tiene un impacto ambiental significativamente menor que los combustibles fósiles.",

    beneficios: [
      "Reducción de emisiones de CO2",
      "Menor contaminación del aire",
      "Conservación de recursos hídricos",
    ],

    datos: [
      "Eficiencia actual: 45-50%",
      "Potencial offshore: 120,000 TWh/año",
    ],

    colombia: [
      "Potencial eólico: 15+ GW",
      "ya existen parques en La Guajira",
    ],

    wide: {
      titulo: "Transición Energética Justa:",
      texto:
        "La implementación de fuentes renovables debe considerar no solo el aspecto técnico y económico, sino también los impactos sociales. Es fundamental garantizar que las comunidades locales se beneficien de estos proyectos y que se respete su territorio y cultura.",
      icono: "assets/icons/info_circle.svg",
    },
  },

  hidroelectrica: {
    // ------------------------------
    // Energía Hidroeléctrica
    // ------------------------------
    nombre: "Energia Hidroeléctrica",
    color: "#37c788",
    icono: "assets/icons/water.svg",
    titulo: "Energía Hidroeléctrica",
    estrellas: 4,
    subtitulo: "Contribución global: 16%",
    descripcion:
      "La energía hidroeléctrica utiliza el movimiento del agua en ríos, presas o corrientes marinas para generar electricidad. Es una de las fuentes renovables más establecidas y representa una importante proporción de la energía renovable global.",

    beneficios: [
      "Reducción de emisiones de CO2",
      "Menor contaminación del aire",
      "Conservación de recursos hídricos",
    ],

    datos: [
      "Vida útil: 50-100 años",
      "16.4% de la electricidad mundial",
    ],

    colombia: [
      "90% de matriz eléctrica actual",
      "Alto potencial en ríos Andinos y Pacífico",
      " varias grandes centrales hidroeléctricas",
    ],

    wide: {
      titulo: "Transición Energética Justa:",
      texto:
        "La implementación de fuentes renovables debe considerar no solo el aspecto técnico y económico, sino también los impactos sociales. Es fundamental garantizar que las comunidades locales se beneficien de estos proyectos y que se respete su territorio y cultura.",
      icono: "assets/icons/info_circle.svg",
    },
  },

  bioenergia: {
    // ------------------------------
    // Bioenergía
    // ------------------------------
    nombre: "Bioenergía",
    color: "#7ac44b",
    icono: "assets/icons/leaf.svg",
    titulo: "Bioenergía",
    estrellas: 4,
    subtitulo: "Potencial sostenible: Alto",
    descripcion:
      "La bioenergía se obtiene de la biomasa (material orgánico vegetal o animal) mediante procesos de conversión térmica, química o bioquímica. Puede utilizarse para generar electricidad, calor o biocombustibles para transporte.",

    beneficios: [
      "Aprovecha residuos",
      "Reduce la contaminación",
      "Fomenta la economía circular",
    ],

    datos: [
      "Tiene buen potencial agrícola",
      "Puede ser neutra en carbono",
      "Diversas tecnologías disponibles",
    ],

    colombia: [
      "Zonas rurales tienen alto potencial",
      "Incentivos para biocombustibles",
      "Uso creciente en cogeneración",
    ],

    wide: {
      titulo: "Transición Energética Justa:",
      texto:
        "La implementación de fuentes renovables debe considerar no solo el aspecto técnico y económico, sino también los impactos sociales. Es fundamental garantizar que las comunidades locales se beneficien de estos proyectos y que se respete su territorio y cultura.",
      icono: "assets/icons/info_circle.svg",
    },
  },
};

// Solo para verificar en consola que el objeto se cargó correctamente
console.log(energias);
