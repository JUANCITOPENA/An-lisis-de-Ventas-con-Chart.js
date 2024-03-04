//Funcion para cargar los datos de la carpeta ".datos/" especificando el archivo fuente
async function cargarDatos(fuente) {
    const res = await fetch(`datos/${fuente}.json`)
    return await res.json()
}

// Cargando los datos para los distintos graficos que estan en la carpeta './datos/'.
// Nota: actualmente no se hace comprobacion de que los datos se cargan correctamente.
const ventasData = await cargarDatos("ventasData");
const clientesData = await cargarDatos("clientesData");
const vendedoresData = await cargarDatos("vendedoresData");
const fechaData = await cargarDatos("fechaData");
const productosData = await cargarDatos("productosData");

  // Función para generar colores aleatorios
  function generarColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  // Función para crear un gráfico de barras
  function crearGraficoBarras(idCanvas, data, label, dataKey) {
    const ctx = document.getElementById(idCanvas).getContext('2d');
    const colors = Array.from({ length: data.length }, () => generarColor()); // Generar colores aleatorios

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item[dataKey]), // Obtener etiquetas de datos
          datasets: [{
            label: label,
            data: data.map(item => item.ventas || item.cantidad), // Obtener datos de ventas o cantidad
            monto: data.map(item => item.monto), // Obtener datos de monto
            descripcion: data.map(item => item.descripcion),
            backgroundColor: colors, // Establecer colores aleatorios
            borderColor: 'rgba(54, 162, 235, 1)', // Establecer color del borde
            borderWidth: 1 // Establecer ancho del borde
          }]
        },
        options: {
          responsive: true, // Hacer el gráfico responsive
          maintainAspectRatio: false, // No mantener el aspect ratio
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true // Comenzar el eje y desde cero
              }
            }]
          },
          plugins: {
            tooltip: { // Personalizar los tooltips
              callbacks: {
                label: function (tooltipItem) {
                  var label = tooltipItem.label || '' // Obtener etiqueta
                  var value = tooltipItem.dataset.data[tooltipItem.datasetIndex] // Obtener valor
                  var monto = tooltipItem.dataset.monto[tooltipItem.datasetIndex] // Obtener monto
                  if (label) {
                    label += ': ' + value;
                  }
                  if (monto){
                  label += ' (Monto: ' + monto + ')'; // Construir etiqueta con monto
                  }
                  return label;
                },
                afterLabel: function (tooltipItem) {
                    let descripcion = tooltipItem.dataset.descripcion[tooltipItem.dataIndex] //Obtener descripcion
                    if (descripcion){
                        return "\n" + descripcion
                    }
                    return
                }
              }
            }
          }
        }
      });
    }

  // Crear los gráficos
  crearGraficoBarras('ventasChart', ventasData, 'Ventas Mensuales (Cantidad)', 'mes');
  crearGraficoBarras('clientesChart', clientesData, 'Ventas por Cliente', 'nombre');
  crearGraficoBarras('vendedoresChart', vendedoresData, 'Ventas por Vendedor', 'nombre');
  crearGraficoBarras('fechaChart', fechaData, 'Ventas por Fecha', 'fecha');
  crearGraficoBarras('productosChart', productosData, 'Ventas por Producto', 'producto');
