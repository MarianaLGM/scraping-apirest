const axios=require("axios");
const cheerio=require ("cheerio");
const express=require("express");
const app= express();

const fs = require("fs");
const PORT=3000;

const url ="https://elpais.com/ultimas-noticias/" 

const scrapingApirest=()=>{
    app.get("/scraping", (req,res)=>{
    //res.send("FUNCIONA!!!!")
        axios.get(url).then((response)=>{//llamamos a axios
            if(response.status === 200){
            const html=response.data //guardar respuesta
            const $=cheerio.load(html)// vamos a llamar a cheerio $ vamos a guardar todo en la variable
            //console.log(html)esto lo que hará es cargar todo el html
        
            let noticias = [];
  
            $("article.c.c-d.c--m").each((index, element)=>{//enlace noticia
                const imagen = $(element).find("img").attr("src");
                const titulo = $(element).find("header.c_h").text();
                const descripcion = $(element).find("p.c_d").text();
                const enlace = $(element).find("a").attr("href");
      
       //console.log(res)
       
                const noticia = {
                    titulo: titulo,
                    imagen: imagen,
                    descripcion: descripcion,
                    enlace: enlace,
            };
                noticias.push(noticia);
                
        });
           
        res.send(noticias)
            fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2)); //aqui guardamos lo que acabamos de scrapear     
            }

    });
   console.log(noticias)
    })
    }
  
app.listen(3000,() =>{
    console.log("Express está escuchando en el puerto 3000")

})

module.exports=(scrapingApirest)
