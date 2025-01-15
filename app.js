
/*Crear funciones para: del archivo `noticias.json`
    - GET obtener todas las noticias
    - GET obtener una noticia por índice
    - POST crear una nueva noticia,
    - PUT actualizar una noticia existente
    - DELETE eliminar una noticia*/


const express=require("express");
const app= express();

app.use(express.json());// Middleware para manejar datos JSON
app.use(express.urlencoded({ extended: true }));// Middleware para manejar datos de formularios URL-encoded


app.listen(3000,() =>{
    console.log("Express está escuchando en el puerto 3000")
})