const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(path.join(__dirname, 'web-build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-build/index.html'));
});
const port = process.env.PORT || 8181;
app.listen(port);
