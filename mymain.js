const httpmod = require("http");
httpmod.createServer(function (request, response) 
{
   // Send the HTTP header 
   // HTTP Status: 200 : OK
  
   response.writeHead(200, {'Content-Type': 'text/html'});
   // Send the response body as "Hello World"
   response.end('<em>Hello World<em> <b>Home Page</b>');
}).listen(8083);

console.log('Server running at http://127.0.0.1:8083/');