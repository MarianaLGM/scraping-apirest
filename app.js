
/*Crear funciones para: del archivo `noticias.json`
    - GET obtener todas las noticias
    - GET obtener una noticia por índice
    - POST crear una nueva noticia,
    - PUT actualizar una noticia existente
    - DELETE eliminar una noticia*/

const scraping= require("./scraping.js")
const express=require("express");
const app= express();
const fs = require("fs");

app.use(express.json());// Middleware para manejar datos JSON
app.use(express.urlencoded({ extended: true }));// Middleware para manejar datos de formularios URL-encoded

app.get("/scraping", scraping)

app.get("/", (req, res)=>{//accedemos todas las noticias para que nos devuelva todo el json

    let noticias="";
        try {
          const data = fs.readFileSync('noticias.json', 'utf-8');
          noticias = JSON.parse(data);
          console.log(noticias)
        } catch (error) {
          console.error('Error al leer el archivo noticias.json:', error.message);
        }
    res.send(noticias);
})


// Ruta para obtener una noticia por índice
app.get('/noticias/:id', (req, res) => {
    const { id } = req.params;
    leerDatos();
    noticia = noticias[id];
    if (noticia) {
      res.json(noticia);
    } else {
      res.status(404).send('Noticia no encontrada');
    }
  });

// Ruta para crear una nueva noticia
app.post('/noticias', (req, res) => {
    const { titulo, descripcion, imagen, enlace } = req.body;
  
    // Leer los datos antes de modificarlos
    leerDatos();
  
    // Verifica que los datos sean válidos antes de agregar
    if (!titulo || !descripcion || !imagen || !enlace) {
      return res.status(400).send('Faltan datos en la solicitud');
    }
  
    const nuevaNoticia = { titulo, descripcion, imagen, enlace };
    noticias.push(nuevaNoticia); // Añadimos la nueva noticia
    guardarDatos(); // Guardamos los cambios en el archivo
  
    res.status(201).json(nuevaNoticia); // Respondemos con la noticia creada
  });

// Ruta para actualizar una noticia
app.put('/noticias/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, imagen, enlace } = req.body;

  leerDatos();
  const noticia = noticias[id];

  if (noticia) {
    noticia.titulo = titulo || noticia.titulo;
    noticia.descripcion = descripcion || noticia.descripcion;
    noticia.imagen = imagen || noticia.imagen;
    noticia.enlace = enlace || noticia.enlace;

    guardarDatos();
    res.json(noticia);
  } else {
    res.status(404).send('Noticia no encontrada');
  }
});

// Ruta para eliminar una noticia
app.delete('/noticias/:id', (req, res) => {
  const { id } = req.params;

  leerDatos();
  if (noticias[id]) {
    noticias.splice(id, 1);  // Eliminamos la noticia
    guardarDatos();
    res.status(204).send();
  } else {
    res.status(404).send('Noticia no encontrada');
  }
});


app.listen(3000,() =>{
    console.log("Express está escuchando en el puerto 3000")
})
