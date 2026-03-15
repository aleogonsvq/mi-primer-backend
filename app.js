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


// ACTUALIZAR un producto (PUT)
app.put('/api/productos/:id', (req, res) => {
  // 1. Capturamos el ID de la URL y lo convertimos a número
  const id = parseInt(req.params.id);
  
  // 2. Buscamos el producto en nuestro array
  const producto = productos.find(p => p.id === id);

  // 3. Si no existe, devolvemos un error 404 (Not Found)
  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  // 4. Si existe, actualizamos sus datos con lo que nos llega en el body
  producto.nombre = req.body.nombre || producto.nombre;
  producto.precio = req.body.precio || producto.precio;

  // 5. Devolvemos el producto actualizado
  res.json(producto);
});

// BORRAR un producto (DELETE)
app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  // Eliminamos 1 elemento en la posición "index"
  productos.splice(index, 1);
  
  // Devolvemos un código 204 (No Content) porque se ha borrado con éxito
  res.status(204).send(); 
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});