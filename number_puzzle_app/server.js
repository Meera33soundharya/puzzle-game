const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3001;

const server = http.createServer((req, res) => {
    // Construct absolute path based on the directory of this script (server.js)
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.js') contentType = 'text/javascript';
    if (extname === '.css') contentType = 'text/css';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found: ' + filePath);
            } else {
                res.writeHead(500);
                res.end('Error loading file: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
