let aparatos = [];

function agregarAparato() {
    // 1. Capturar valores del HTML
    const nombre = document.getElementById('nombre').value;
    const potencia = parseFloat(document.getElementById('potencia').value);
    const horas = parseFloat(document.getElementById('horas').value);

    // 2. Validaciones simples
    if (!nombre || isNaN(potencia) || isNaN(horas)) {
        alert("Por favor completa todos los campos correctamente.");
        return;
    }

    // 3. Calcular consumo mensual de este aparato
    // Fórmula: (Watts * Horas * 30 días) / 1000 = kWh mes
    const consumoMensual = (potencia * horas * 30) / 1000;

    // 4. Crear objeto y guardarlo en el array
    const aparato = {
        id: Date.now(), // Identificador único
        nombre: nombre,
        potencia: potencia,
        horas: horas,
        consumo: consumoMensual
    };

    aparatos.push(aparato);

    // 5. Limpiar inputs y actualizar vista
    document.getElementById('nombre').value = '';
    document.getElementById('potencia').value = '';
    document.getElementById('horas').value = '';
    
    actualizarTabla();
}

function actualizarTabla() {
    const tbody = document.getElementById('lista-aparatos');
    tbody.innerHTML = ''; // Limpiar tabla actual

    aparatos.forEach(aparato => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${aparato.nombre}</td>
            <td>${aparato.potencia} W</td>
            <td>${aparato.horas} h</td>
            <td>${aparato.consumo.toFixed(2)} kWh</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarAparato(${aparato.id})">X</button>
            </td>
        `;
        
        tbody.appendChild(fila);
    });

    calcularTotal();
}

function eliminarAparato(id) {
    aparatos = aparatos.filter(aparato => aparato.id !== id);
    actualizarTabla();
}

function calcularTotal() {
    const precioKwh = parseFloat(document.getElementById('precio-kwh').value) || 0;
    
    // Sumar todos los consumos
    const totalKwh = aparatos.reduce((acc, item) => acc + item.consumo, 0);
    const costoTotal = totalKwh * precioKwh;
    // Conversión kWh → TWh
    const totalTWh = ((totalKwh*12) / 1000000000);

    // Porcentaje respecto a 59.85 TWh
    const prome = ((totalTWh * 100) / 59.85).toFixed(6);

  
  


    // Mostrar en el HTML
    document.getElementById('total-kwh').innerText = totalKwh.toFixed(2);
    document.getElementById('total-precio').innerText = costoTotal.toLocaleString('es-CO', { minimumFractionDigits: 2 });
    document.getElementById('prome-al').innerText = prome;
}