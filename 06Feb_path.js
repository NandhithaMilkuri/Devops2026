const http = require("http");
const path = require("path");
http.createServer((req, res) =>
{
  const filePath = path.join(__dirname, "data.txt");
  res.statusCode = 200;
  res.end("File path is: " + filePath);

}).listen(3000);

console.log("Server running on port 3000");
