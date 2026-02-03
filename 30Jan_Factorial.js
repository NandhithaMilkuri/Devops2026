const http = require("http");

function factorial(n) {
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
  }
  return fact;
}

http.createServer((req, res) => {

  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const n = Number(myURL.searchParams.get("n"));

  res.writeHead(200, { "Content-Type": "text/plain" });

  if (isNaN(n) || n < 0) {
    res.end("Please pass a non-negative number. Example: ?n=8");
  } else {
    res.end("Factorial: " + factorial(n));
  }

}).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
