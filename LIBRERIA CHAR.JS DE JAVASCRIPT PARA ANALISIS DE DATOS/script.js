// Datos de ejemplo para los gráficos
const ventasData = [
    { mes: 'Enero', cantidad: 120, monto: 12000 },
    { mes: 'Febrero', cantidad: 150, monto: 15000 },
    { mes: 'Marzo', cantidad: 180, monto: 18000 },
    { mes: 'Abril', cantidad: 135, monto: 13500 },
    { mes: 'Mayo', cantidad: 200, monto: 20000 },
    { mes: 'Junio', cantidad: 220, monto: 22000 },
    { mes: 'Julio', cantidad: 190, monto: 19000 },
    { mes: 'Agosto', cantidad: 170, monto: 17000 },
    { mes: 'Septiembre', cantidad: 160, monto: 16000 },
    { mes: 'Octubre', cantidad: 185, monto: 18500 },
    { mes: 'Noviembre', cantidad: 210, monto: 21000 },
    { mes: 'Diciembre', cantidad: 230, monto: 23000 }
  ];
// Datos de ejemplo para los gráficos de ventas por cliente
  const clientesData = [
    { nombre: 'Juancito Pena', ventas: 15 },
    { nombre: 'Dariel Vasquez', ventas: 20 },
    { nombre: 'Daniela Hichez', ventas: 18 },
    { nombre: 'Maria Vizcaino', ventas: 22 },
    { nombre: 'Jennifer Lombardy', ventas: 25 }
  ];
// Datos de ejemplo para los gráficos de ventas por vendedor
  const vendedoresData = [
    { nombre: 'Antonio Perez', ventas: 30 },
    { nombre: 'Jesus Maldonado', ventas: 25 },
    { nombre: 'Pedro de la Cruz', ventas: 28 },
    { nombre: 'Marino Pena', ventas: 35 },
    { nombre: 'Salvador Ramirez', ventas: 32 }
  ];
// Datos de ejemplo para los gráficos de ventas por fecha
  const fechaData = [
    { fecha: '2024-01-01', ventas: 120 },
    { fecha: '2024-02-01', ventas: 150 },
    { fecha: '2024-03-01', ventas: 180 },
    { fecha: '2024-04-01', ventas: 135 },
    { fecha: '2024-05-01', ventas: 200 },
    { fecha: '2024-06-01', ventas: 220 },
    { fecha: '2024-07-01', ventas: 190 },
    { fecha: '2024-08-01', ventas: 170 },
    { fecha: '2024-09-01', ventas: 160 },
    { fecha: '2024-10-01', ventas: 185 },
    { fecha: '2024-11-01', ventas: 210 },
    { fecha: '2024-12-01', ventas: 230 }
  ];
// Datos de ejemplo para los gráficos de ventas por producto
const productosData = [
    { producto: 'Teclado Gamer', descripcion: 'Teclado mecánico retroiluminado', cantidad: 50, monto: 5000 },
    { producto: 'Mouse Gamer', descripcion: 'Mouse óptico de alta precisión', cantidad: 65, monto: 6500 },
    { producto: 'Auriculares Gamer', descripcion: 'Auriculares con sonido envolvente', cantidad: 40, monto: 4000 },
    { producto: 'Mousepad Gamer', descripcion: 'Mousepad de gran tamaño', cantidad: 30, monto: 3000 },
    { producto: 'Monitor Gamer', descripcion: 'Monitor de alta resolución y frecuencia de actualización', cantidad: 20, monto: 8000 },
    { producto: 'Silla Gamer', descripcion: 'Silla ergonómica para largas sesiones de juego', cantidad: 15, monto: 6000 },
    { producto: 'Tarjeta Gráfica Gamer', descripcion: 'Tarjeta gráfica de última generación para un rendimiento óptimo', cantidad: 25, monto: 10000 },
    { producto: 'Cámara Web Gamer', descripcion: 'Cámara web de alta definición para transmisiones en vivo', cantidad: 35, monto: 4500 },
    { producto: 'Audífonos Inalámbricos Gamer', descripcion: 'Audífonos con conexión inalámbrica para una mayor comodidad', cantidad: 45, monto: 5500 },
    { producto: 'Volante Gamer', descripcion: 'Volante de simulación para juegos de carreras', cantidad: 10, monto: 7000 }
  ];

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
          tooltips: { // Personalizar los tooltips
            callbacks: {
              label: function (tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || ''; // Obtener etiqueta
                var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]; // Obtener valor
                var monto = data.datasets[tooltipItem.datasetIndex].monto[tooltipItem.index]; // Obtener monto
                if (label) {
                  label += ': ';
                }
                label += value + ' (Monto: ' + monto + ')'; // Construir etiqueta con monto
                return label;
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