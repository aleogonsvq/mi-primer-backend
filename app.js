const express = require('express');
const { PrismaClient } = require('@prisma/client'); // 1. Importamos Prisma

const app = express();
const prisma = new PrismaClient(); // 2. Creamos la conexión a la Base de Datos
const port = 3000;

app.use(express.json());

// --- NUEVAS RUTAS CONECTADAS A LA BASE DE DATOS ---

// 1. LEER todos los productos (GET)
app.get('/api/productos', async (req, res) => {
  // findMany() es el equivalente de Prisma a "SELECT * FROM Producto"
  const productosDB = await prisma.producto.findMany(); 
  res.json(productosDB);
});

// 2. CREAR un nuevo producto (POST)
app.post('/api/productos', async (req, res) => {
  // create() inserta una nueva fila en tu tabla
  const nuevoProducto = await prisma.producto.create({
    data: {
      nombre: req.body.nombre,
      precio: req.body.precio
    }
  });
  
  res.status(201).json(nuevoProducto);
});


// 3. ACTUALIZAR un producto (PUT)
app.put('/api/productos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // update() busca por ID y actualiza los datos
    const productoActualizado = await prisma.producto.update({
      where: { id: id },
      data: {
        nombre: req.body.nombre,
        precio: req.body.precio
      }
    });
    
    res.json(productoActualizado);
  } catch (error) {
    // Si Prisma no encuentra el ID, caemos aquí
    res.status(404).json({ mensaje: 'Producto no encontrado en la base de datos' });
  }
});

// 4. BORRAR un producto (DELETE)
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // delete() busca por ID y elimina la fila
    await prisma.producto.delete({
      where: { id: id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ mensaje: 'Producto no encontrado en la base de datos' });
  }
});

// (De momento dejamos el PUT y DELETE comentados o borrados, los haremos después)

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});