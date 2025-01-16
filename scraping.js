const axios=require("axios");
const cheerio=require ("cheerio");

const fs = require("fs");
const PORT=3000;

const url ="https://elpais.com/ultimas-noticias/" 

// Guardar datos en el archivo JSON
function guardarDatos(noticias) {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
  }

const scraping=(req,res)=>{ 
    axios.get(url).then((response)=>{//llamamos a axios
        if(response.status === 200){
        const html=response.data //guardar respuesta
        const $=cheerio.load(html)// vamos a llamar a cheerio $ vamos a guardar todo en la variable
        //console.log(html)esto lo que hará es cargar todo el html
        
        let noticias = [];
  
            $("article.c.c-d.c--m").each((index, element)=>{
                console.log(element);
                const imagen = $(element).find("img").attr("src");
                const titulo = $(element).find("header.c_h").text();
                const descripcion = $(element).find("p.c_d").text();
                const enlace = $(element).find("a").attr("href");//enlace noticia

                const noticia = {
                    titulo: titulo,
                    imagen: imagen,
                    descripcion: descripcion,
                    enlace: enlace,
            };
                noticias.push(noticia);
                
        });  
        guardarDatos(noticias);   
        res.send(noticias);
            }

    });

    }
  
module.exports=(scraping)


