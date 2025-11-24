// Texto principal que se muestra en la cabecera del componente
const tituloPrincipal = "Fuentes de Energía Renovable";

// Estructura de datos principal: cada clave es un tipo de energía.
// Cada objeto contiene los campos que la UI consume: nombre, color, icono,
// título, estrellas, subtítulo, descripción, listas y la tarjeta 'wide'.
const energias = {
  solar: {
    // Datos para la energía Solar
    nombre: "Energia Solar",
    color: "#f7b543",
    icono: "assets/icons/sun.svg",
    titulo: "Energía Solar",
    estrellas: 4,
    subtitulo: "Crecimiento anual: +22%",
    descripcion:
      "La energía solar es una fuente renovable que aprovecha la radiación del sol para generar electricidad a través de paneles fotovoltaicos o para calentar fluidos en sistemas térmicos. Es una de las fuentes de energía más abundantes y limpias del planeta.",

    beneficios: [
      "Beneficios Ambientales",
      "Reducción de emisiones de CO2",
      "Menor contaminación del aire",
      "Disminución de residuos tóxicos",
    ],

    datos: [
      "Costo reducido un 85% desde 2010",
      "Potencial global: 23,000 TW/año",
      ,
    ],

    colombia: [
      "Colombia recibe en promedio 4,5 a 6 kWh/m2 de radiación solar diaria",
      "Guajira y Cesar son zonas ideales para proyectos fotovoltaicos",
      "El país tiene incentivos tributarios para proyectos solares",
    ],

    // ⭐ Tarjeta ancha adicional
    wide: {
      titulo: "Transición Energética Justa:",
      texto:
        "La implementación de fuentes renovables debe considerar no solo el aspecto técnico y económico, sino también los impactos sociales. Es fundamental garantizar que las comunidades locales se beneficien de estos proyectos y que se respete su territorio y cultura.",
      icono: "assets/icons/info_circle.svg",
    },
  },

  eolica: {
    // Datos para la energía Eólica
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
      "Disminución de residuos tóxicos",
    ],
    datos: ["Eficiencia actual: 45-50%", "Potencial offshore: 120,000 TWh/año"],

    colombia: [
      "Potencial eólico: 15+ GW",
      /*
        data.js
        - Aquí se define la información que consume la interfaz.
        - Cada entrada dentro del objeto `energias` contiene todos los datos
          necesarios para una tarjeta: nombre, color, icono, texto y listas.
        - Para añadir una nueva energía: copiar una de las claves existentes
          (solar, eolica, etc.), renombrarla y actualizar sus campos.
      */
      "Parques en La Guajira y Norte de Santander",
    ],

    wide: {
      titulo: "Transición Energética Justa:",
      texto:
        "La implementación de fuentes renovables debe considerar no solo el aspecto técnico y económico, sino también los impactos sociales. Es fundamental garantizar que las comunidades locales se beneficien de estos proyectos y que se respete su territorio y cultura.",
      icono: "assets/icons/info_circle.svg",
    },
  },

  hidroelectrica: {
    // Datos para la energía Hidroeléctrica
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
      "Disminución de residuos tóxicos",
      "Conservación de recursos hídricos",
    ],
    datos: ["Vida útil: 50-100 años", "16.4% de la electricidad mundial"],
    colombia: [
      "90% de matriz eléctrica actual",
      "Grandes proyectos en el río Magdalena",
    ],
    wide: {
      titulo: "Transición Energética Justa:",
      texto:
        "La implementación de fuentes renovables debe considerar no solo el aspecto técnico y económico, sino también los impactos sociales. Es fundamental garantizar que las comunidades locales se beneficien de estos proyectos y que se respete su territorio y cultura.",
      icono: "assets/icons/info_circle.svg",
    },
  },

  bioenergia: {
    // Datos para la Bioenergía
    nombre: "Bioenergía",
    color: "#7ac44b",
    icono: "assets/icons/leaf.svg",
    titulo: "Bioenergía",
    estrellas: 4,
    subtitulo: "Potencial sostenible: Alto",
    descripcion: "La bioenergía se obtiene de la biomasa (material orgánico vegetal o animal) mediante procesos de conversión térmica, química o bioquímica. Puede utilizarse para generar electricidad, calor o biocombustibles para transporte.",
    beneficios: ["Aprovecha residuos", "Reduce la contaminación"],
    datos: ["Tiene buen potencial agrícola"],
    colombia: ["Zonas rurales tienen alto potencial"],
    wide: {
      titulo: "Transición Energética Justa:",
      texto:
        "La implementación de fuentes renovables debe considerar no solo el aspecto técnico y económico, sino también los impactos sociales. Es fundamental garantizar que las comunidades locales se beneficien de estos proyectos y que se respete su territorio y cultura.",
      icono: "assets/icons/info_circle.svg",
    },
  },
};

console.log(energias);
