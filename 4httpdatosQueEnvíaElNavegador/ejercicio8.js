var http = require("http");
var url = require("url");

var server = http.createServer(function(request,response){
    if (url.parse(request.url).path != "/favicon.ico")
    {
        var objetoUrl = url.parse(request.url);
        console.log("Camino completo: "+objetoUrl.path);
        console.log("Camino y nombre: "+objetoUrl.pathname);
        console.log("Parametros: "+objetoUrl.query);
                response.writeHead(200, {'Content-Type':'text/html'});
                response.write("<!doctype html><html><head></head>"+
                                "<body><h1>Hola Mundo</h1></body></html>");
                response.end();
    }
});

server.listen(8888);

console.log("Servidor Iniciado");