require('dotenv/config');
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();


// Server setting
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Koitoror University frontend application listening on port(${port})`);
});
