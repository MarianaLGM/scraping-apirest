const axios=require("axios");
const cheerio=require ("cheerio");
const express= require ("express");
const app= express();
const PORT=3000;

const url ="https://elpais.com/ultimas-noticias/" 

app.get("/scraping", (req,res)=>{
    //res.send("FUNCIONA!!!!")
    axios.get(url).then((response)=>{//llamamos a axios
        if(response.status === 200){
            const html=response.data //guardar respuesta
            const $=cheerio.load(html)// vamos a llamar a cheerio $ vamos a guardar todo en la variable
            //console.log(html)
            // esto lo que hará es cargar todo el html
        
        let noticias = [];
        let links = [];

        $("a").each((index, element)=>{//enlace noticia
        const link=$(element).attr("href")
        links.push(link)
        })
        console.log(res)
        res.send(links)
        /*(`
            <ul>
              ${links.map(link=>`<li>${link}</li>`).join("")}
            </ul>
            `
            )*/
        //const titulo=$(element).attr("titulo")

       // const descripcion=$(element).attr("descripcion")
        
       /* const noticia = {
            titulo: titulo,
            imagen: imagen,
            descripcion: descripcion,
            enlace: enlace,
        };   */ 
    
   
    }
})

})

app.listen(3000, ()=>{
    console.log(`express está escuchando en el puerto ${PORT}`)
})




//guardaremos fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));