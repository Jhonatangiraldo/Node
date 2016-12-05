var fs = require("fs");

function leer(error, datos){
    if (error){
        console.log(error);
    }else{
        console.log(datos.toString());
    }
}

fs.readFile ("./archivo.txt", leer);