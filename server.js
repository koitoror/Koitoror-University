const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {

  // Add a specific route for service-worker.js before the wildcard route:
  app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'service-worker.js'));
  });

  // Serve any static files
  // app.use(express.static(path.join(__dirname, 'frontend/staticfiles')));
  // app.use(express.static(__dirname));
  // app.use('/static', express.static(path.join(__dirname, 'frontend')))
  app.use('/static', express.static('frontend/build'))

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
