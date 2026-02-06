const http = require("http");

http.createServer((req, res) => {
  res.statusCode = 200;   // HTTP status code
  res.end("Hello, my name is Nandhitha");
}).listen(3000);

console.log("Server running on port 3000");
