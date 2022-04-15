const { join } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const styleToCss = require('style-object-to-css-string');

const app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  const css = styleToCss(req.cookies);
  const styles = Object.entries(req.cookies).map(([property, value]) => ({ property, value }));
  res.render('index', {
    css,
    styles
  });
});

app.post('/styles', (req, res) => {
  const { property, value } = req.body;
  res.set('set-cookie', `${property}=${value}`);
  res.redirect('/');
});

module.exports = app;
