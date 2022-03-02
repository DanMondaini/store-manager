require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const productsRoutes = require('./routes/products.routes');
const salesRoutes = require('./routes/sales.routes');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);

app.use('/sales', salesRoutes);

app.use((err, _req, res, _next) => res.status(err.status || 500).json({ message: err.message }));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});