const http = require('http');
const fs = require('fs');
const port = 4040;
const server = http.createServer((req, res) => {
// Set the response header
res.writeHead(200, { 'Content-Type': 'text/html' });
// Read the HTML file and serve it
fs.readFile('menubar.html', (err, data) => {
if (err) {
res.writeHead(404);
res.end("404 Not Found");
return;
}
res.end(data);
});
});
server.listen(port, () => {
console.log(`Server running at http://localhost:${port}/`);
});