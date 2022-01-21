const express = require('express');
const app = express();

const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));

// db
const products = require('./products');

// main site index route
app.get('/', (req, res) => {
  res.send(`
  <h1>Home Page</h1>
  <h3>This is working<h3>
  <h3><a href='/products'>Go to Products page</a></h3>
  `)
})

// product index route
app.get('/products', (req, res) => {
  res.send(products);
});

// product show route
app.get('/products/:id', (req, res) => {
  res.send(products[req.params.id]);
});

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


