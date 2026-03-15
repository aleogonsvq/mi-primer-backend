const express = require('express'); // Importamos Express
const app = express(); // Creamos la aplicación
const port = 3000; // Definimos el puerto donde va a escuchar

// Creamos nuestra primera "Ruta" (Endpoint)
app.get('/', (req, res) => {
  res.send('¡Hola Mundo! Mi servidor Express está vivo.');
});

// Encendemos el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});