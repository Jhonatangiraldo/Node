var http = require("http");
var url = require("url");
var fs = require("fs");
var formidable = require("formidable");

var mime = require("mime");

var servidor = http.createServer(function(request, response){
    var objetoUrl = url.parse(request.url);
    var camino = 'public' + objetoUrl.pathname;
    if (camino == "public/"){
        camino = 'public/index.html'; 
    }
    encaminar(request, response, camino);
});

servidor.listen(8888);

function encaminar(request, response, camino){
    switch (camino){
        case 'public/subir':
            subir(request,response);
            break;
        
        case 'public/listadoFotos':
            listar(response);
            break;
        
        default:
            fs.exists(camino, function(existe){
                if (existe){
                    fs.readFile(camino, function(error, contenido){
                        if (error){
                            response.writeHead(500, {'Content-Type': 'text/plain'});
                            response.write('Error interno');
                            response.end();  
                        }else{
                            var mimearchivo = mime.lookup(camino);
                            response.writeHead(200, {'Content-Type': mimearchivo});
                            response.write(contenido);
                            response.end();   
                        }
                    });
                }else{
                    response.writeHead(404, {'Content-Type': 'text/html'});
                    response.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');        
                    response.end();
                }
            });
            break;

    }
}

//Logica para el upload de la imagen
function subir(request, response){
    var entrada = new formidable.IncomingForm();
    //entrada.uploadDir = 'upload'; //Es el directorio donde se guardaran las imagenes
    entrada.parse(request); //datos del archivo adjunto a ser procesado
    //El evento fileBeing se dispara cuando el archivo se está por grabar en el servidor
    entrada.on('fileBegin', function(field, file){
        file.path = "./public/upload/"+file.name;
    });   
    //El evento end se dispara cuando el archivo ya se almacenó en el servidor 
    entrada.on('end', function(){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<!doctype html><html><head></head><body>'+
                        'Archivo subido<br><a href="index.html">Retornar</a></body></html>');        
        response.end();
    });    
}


function listar(response) {
    //readdir lee todos los archivos de un directorio
    fs.readdir('./public/upload/',function (error, vectorArchivos){
        var fotos = '';

        for(var x = 0; x < vectorArchivos.length; x++) {
            fotos += '<img src="upload/'+vectorArchivos[x]+'"><br>';
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<!doctype html><html><head></head><body>'+
                        fotos + '<a href="index.html">Retornar</a></body></html>');        
        response.end();      
    });    
}


console.log('Servidor web iniciado');

