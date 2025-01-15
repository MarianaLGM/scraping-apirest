
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



app.listen(3000,() =>{
    console.log("Express está escuchando en el puerto 3000")
})