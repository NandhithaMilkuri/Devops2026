const http = require("http");
const url = require("url");

http.createServer((req, res) => {

  const q = url.parse(req.url, true).query;
  const num = Number(q.num);

  res.writeHead(200, { "Content-Type": "text/plain" });

  if (isNaN(num)) {
    res.end("Please pass a number. Example: ?num=10");
  } else if (num % 2 === 0) {
    res.end("Even Number");
  } else {
    res.end("Odd Number");
  }

}).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
