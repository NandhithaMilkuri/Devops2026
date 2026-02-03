const http = require("http");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your name: ", (name) => {

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello " + name);
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });

  rl.close();
});
