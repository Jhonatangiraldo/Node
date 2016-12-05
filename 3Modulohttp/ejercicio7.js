var http = require("http");

var server = http.createServer(function(request,response){
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write("<!doctype html><html><head></head>"+
                            "<body><h1>Sitio en desarrollo</h1></body></html>");
            response.end();
});

server.listen(8888);

console.log("Servidor Iniciado");