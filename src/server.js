const http = require("http");
const fs = require("fs");
const path = require("path");
const WORDS = require("./wordle_solver");

const PORT = 3000;
const basePath = path.join(__dirname, "../puzzle_app");

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json"
};

http.createServer((req, res) => {

    // API to send words to frontend
    if (req.url === "/api/words") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(WORDS));
        return;
    }

    // Serve frontend files
    let filePath = path.join(
        basePath,
        req.url === "/" ? "index.html" : req.url
    );

    let ext = path.extname(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("404 Not Found");
        } else {
            res.writeHead(200, {
                "Content-Type": mimeTypes[ext] || "text/plain"
            });
            res.end(content);
        }
    });

}).listen(PORT, () => {
    console.log(`✅ Server running at http://127.0.0.1:${PORT}`);
});
