const express=require("express");
const app=express("app");
const bodyparser=require("body-parser");
const request = require('request');
var urlencodedParser = bodyparser.urlencoded({extended: false});

app.set("view engine","ejs");
app.use(express.static("public"));
app.use("/js",express.static(__dirname+"public/js"));
app.use("/css",express.static(__dirname+"public/css"));
app.use("/fonts",express.static(__dirname+"public/fonts"));
app.use("/imgs",express.static(__dirname+"public/imgs"));

app.get("/",async (req,res)=>{
    res.render("index");
})

app.post("/buscarPokemon",urlencodedParser,function (req,res){
    //console.log(req.body.pokemon);
    request('https://pokeapi.co/api/v2/pokemon/'+req.body.pokemon, { json: true }, (err, response, body) => {
        if(body==="Not Found"){
            res.render("index");
        }
        if (err) { return console.log(err); }
        console.log(body);
        console.log("resposita:"+body);
        var nombre=body.forms[0].name.charAt(0).toUpperCase()+body.forms[0].name.slice(1);
        var typesPokemon=body.types;
        var typeArray=[];
        var colorArray=[];
        typesPokemon.forEach(type =>{
            typeArray.push(type.type.name);
            console.log(type.type.name);
        })


        var prevID=String(parseInt(body.id)-1);
        var nextID=String(parseInt(body.id)+1);
        if(parseInt(prevID)<1){
            prevID="898";
        }
        if(parseInt(nextID)>898){
            nextID="1";
        }

        console.log("prev: "+ prevID);
        console.log("next: "+ nextID);

        res.render("pokemon",{body:body,nombre:nombre,prevID:prevID,nextID:nextID});//mostrar ejs pokemon

    });


})
app.listen(3000);


