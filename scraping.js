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
  
            $("article.c.c-d.c--m").each((index, element)=>{
                const imagen = $(element).find("img").attr("src");
                const titulo = $(element).find("header.c_h").text();
                const descripcion = $(element).find("p.c_d").text();
                const enlace = $(element).find("a").attr("href");//enlace noticia
      
       //console.log(res)
       
                const noticia = {
                    titulo: titulo,
                    imagen: imagen,
                    descripcion: descripcion,
                    enlace: enlace,
            };
                noticias.push(noticia);
                
        });    
        //res.send(noticias)
            fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2)); //aqui guardamos lo que acabamos de scrapear     
            }

    });

    })
    }
  
app.listen(3000,() =>{
    console.log("Express está escuchando en el puerto 3000")

})

module.exports=(scrapingApirest)


//SERGIO
/* const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://elpais.com/ultimas-noticias/" 

const scrapeNoticias = async () => {
    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const noticias = [];

            $('article.c.c-d.c--m').each((index, element) => {
                const titulo = $(element).find('header.c_h').text();
                const descripcion = $(element).find('p.c_d').text();
                const enlace = $(element).find('a').attr('href');
                const imagen = $(element).find('img').attr('src');

                if (titulo && enlace && imagen) {
                    noticias.push({
                        titulo,
                        descripcion,
                        enlace,
                        imagen,
                    });
                }
            });

            fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
            console.log('Noticias guardadas en noticias.json');
            return noticias;
        } else {
            throw new Error("Error al obtener la página");
        }
    } catch (error) {
        console.error("Error al realizar el scraping:", error.message);
        throw error;
    }
}

module.exports = scrapeNoticias; */