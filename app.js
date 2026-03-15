const express = require('express');
const app = express();
// AÑADE ESTA LÍNEA: Es un "traductor" para que Express entienda el JSON que le enviaremos
app.use(express.json());
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

// NUEVA RUTA: Crear un producto nuevo (POST)
app.post('/api/productos', (req, res) => {
  // 1. Capturamos los datos que nos envía el cliente (Postman) en el "cuerpo" de la petición
  const nuevoProducto = req.body; 

  // 2. Le asignamos un ID automático (simulando lo que haría una base de datos real)
  nuevoProducto.id = productos.length + 1;

  // 3. Añadimos el nuevo producto a nuestro array
  productos.push(nuevoProducto);

  // 4. Respondemos con un código 201 (Created) y devolvemos el producto recién creado
  res.status(201).json(nuevoProducto);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});