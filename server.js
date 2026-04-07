const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

// Existing settings endpoint
app.get('/settings', (req, res) => {
  fs.readFile('settings.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).type('text/plain').send('Error reading settings file\n');
      return;
    }

    const settings = {};
    data.split('\n').forEach(line => {
      const parts = line.split(': ');
      if (parts.length === 2) {
        settings[parts[0].trim()] = parts[1].trim().replace(/"/g, '');
      }
    });

    res.json(settings);
  });
});

// Serve static files from the puzzle_app directory
app.use(express.static(path.join(__dirname, 'puzzle_app')));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

