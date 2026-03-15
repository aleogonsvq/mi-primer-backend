const express = require('express');
const app = express();
const port = 3000;

// 1. Nuestra "Base de datos" temporal (en memoria)
const productos = [
  { id: 1, nombre: 'Laptop Gamer', precio: 1200 },
  { id: 2, nombre: 'Ratón Inalámbrico', precio: 25 },
  { id: 3, nombre: 'Teclado Mecánico', precio: 85 }
];

// 2. Tu ruta original (texto)
app.get('/', (req, res) => {
  res.send('¡Hola Mundo! Mi servidor Express está vivo.');
});

// 3. NUEVA RUTA: Devolver la lista de productos en formato JSON
app.get('/api/productos', (req, res) => {
  // En lugar de res.send, usamos res.json para que Express lo formatee correctamente
  res.json(productos); 
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});