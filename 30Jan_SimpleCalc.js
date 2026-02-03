const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  if (req.method === "GET") {
    // Serve the HTML form
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <body>
          <h2>2-Number Calculator</h2>
          <form method="POST">
            Number 1: <input type="number" name="a" required><br><br>
            Number 2: <input type="number" name="b" required><br><br>
            <input type="submit" value="Calculate">
          </form>
        </body>
      </html>
    `);
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      // Parse form data
      const params = new URLSearchParams(body);
      const a = Number(params.get("a"));
      const b = Number(params.get("b"));

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h2>Results:</h2>`);
      res.write(`Addition: ${a + b}<br>`);
      res.write(`Subtraction: ${a - b}<br>`);
      res.write(`Multiplication: ${a * b}<br>`);
      res.write(`Division: ${b !== 0 ? a / b : "Infinity"}<br>`);
      res.end(`<br><a href="/">Go Back</a>`);
    });
  }
}).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
