const http = require("http");

http.createServer((req, res) => {

  const myUrl = new URL(req.url, "http://localhost:3000");

  res.statusCode = 200;
  res.end("Path: " + myUrl.pathname);

}).listen(3000);

console.log("Server running on port 3000");
