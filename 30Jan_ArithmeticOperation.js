let a = 10, b = 5;

// Console output
console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);

const http = require('node:http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end(
        `Addition: ${a + b}\n` +
        `Subtraction: ${a - b}\n` +
        `Multiplication: ${a * b}\n` +
        `Division: ${a / b}\n`
    );
}).listen(3000);

console.log("Server running on port 3000");