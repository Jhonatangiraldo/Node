var fileSystem = require("fs");

function escribir(error){
    if (error){
        console.log(error);
    }else{
        console.log("El archivo txt fue creado");
    }
}

fileSystem.writeFile("./archivo.txt", "Linea1 / Linea2", escribir);

console.log("Ultima Linea del Programa en js");
