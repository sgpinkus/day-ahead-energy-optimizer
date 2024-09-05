const { join } = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.port ?? 5173;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(morgan('short'));
app.use(function (req, _res, next) {
  req.url = req.url.replace(/\/+/g, '/');
  next();
});
app.use(express.static('dist'));
app.get('*', function (req, res) {
  res.sendFile(join(__dirname, './dist/index.html'));
});
