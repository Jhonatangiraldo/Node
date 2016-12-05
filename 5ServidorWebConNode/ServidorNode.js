var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function(request,response){
    if (url.parse(request.url).path != "/favicon.ico")
    {
        var objetoUrl = url.parse(request.url);
        var ruta =  objetoUrl.pathname;
        if (ruta == "/"){
            ruta = "index.html";
        }
        //Para quitar el '/' al inicio, esto no deja a node leer archivos
        ruta = ruta.substr( 1,ruta.length);
        fs.exists(ruta, function(respuesta){
            if (respuesta){
                fs.readFile(ruta, function(error, contenido){
                    if (!error){
                        response.writeHead(200, {'Content-Type':'text/html'});
                        response.write(contenido);
                        response.end();
                    }else{
                        response.writeHead(500,{'Content-Type':'text/plain'});
                        response.write("Error Interno");
                        response.end();
                    }
                });
            }else{
                response.writeHead(404,{'Content-Type':'text/html'});
                response.write("<html>Recurso no encontrado</html>" + ruta);
                response.end();
            }
        });
    }
});

server.listen(8888);

console.log("Servidor Iniciado");