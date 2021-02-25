/* eslint-disable no-console */
const express = require('express');
const consolidate = require('consolidate');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// Static file declaration
app.use(express.static(path.join(__dirname, './build')));

// Set swig as the template engine
app.engine('.html', consolidate.swig);

// Set views path and view engine
app.set('view engine', '.html');
app.set('views', path.join(__dirname, './build'));

app.locals.cache = 'memory';
// build mode
app.get('*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=31557600');
  res.render('index', { cache: true });
});

// start server
app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
