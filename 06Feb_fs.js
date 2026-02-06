const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {

  fs.writeFile("data.txt", "Hello from Node.js Server", (err) => {
    if (err) {
      res.statusCode = 500;
      res.end("Write Error");
      return;
    }

    fs.readFile("data.txt", "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Read Error");
        return;
      }

      res.statusCode = 200;
      res.end(data);
    });
  });

}).listen(3000);

console.log("Server running on port 3000");
