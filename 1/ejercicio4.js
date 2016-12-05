var os = require("os");

var inicial = os.freemem()
console.log("Espacio libre inicial: " + os.freemem());

var vector = new Array();
// var vector = []
for (var i=0;i<1000000;i++){
    vector[i] = i;
}

console.log("Espacio libre despues del vector: " + os.freemem());
console.log("Diferencia: " + (inicial - os.freemem()));