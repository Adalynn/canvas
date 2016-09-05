var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;
      switch(path){
          case '/':
              response.writeHead(200, {'Content-Type': 'text/html'});
              response.write('hello world');
              response.end();
              break;
          case '/socket.html':
              var file_path = __dirname +"/views"+ path;
              fs.readFile(file_path, function(error, data){
                  if (error){
                      response.writeHead(404);
                      response.write("opps this doesn't exist - 404" + file_path);
                      response.end();
                  }
                  else{
                      response.writeHead(200, {"Content-Type": "text/html"});
                      response.write(data, "utf8");
                      response.end();
                  }
              });
              break;
          default:
              response.writeHead(404);
              response.write("opps this doesn't exist - 404");
              response.end();
              break;
      }
});

server.listen(3010);
//http://127.0.0.1:3010/ ====> hello world
//http://127.0.0.1:3010/index.html ==> opps this doesn't exist - 404
//http://127.0.0.1:3010/socket.html =====> opps this doesn't exist - 404
console.log("Server is listening");

io.listen(server);

var listener = io.listen(server);
listener.sockets.on('connection', function(socket){
    //socket.emit('message', {'message': 'hello world'});
    //sending data every second
		setInterval(function(){
		    socket.emit('date', {'date': new Date()});
		}, 1000);


		  //recieve client data
		  socket.on('client_data', function(data){
		    //process.stdout.write(data.letter);
		    console.log(data.letter);
		  });
});


