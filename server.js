const express = require('express');
const app = express();

const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('./public'));

app.set('view engine', 'ejs');

// db
const products = require('./products');

// main site index route
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// product index route
app.get('/products', (req, res) => {
  res.render('products/index.ejs', { products });
});

// product new form route
app.get('/products/new', (req, res) => {
  res.render('products/new.ejs')
})

// product show route
app.get('/products/:id', (req, res) => {
  res.render('products/show.ejs', { product: products[req.params.id] });
});

// catch-all redirect
app.get('/*', (req, res) => res.redirect('/'));

// product create route
app.post('/products', (req, res) => {
  console.log('CREATE route accessed');
  console.log('Data within req.body: ', req.body);
  products.push(req.body);
  res.redirect('/products');
});


app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
});


