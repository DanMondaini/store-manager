const connection = require('./connection');

const serialize = (salesData) => salesData.map((sale) => {
  const { sale_id: saleId, product_id: productId, quantity, date } = sale;

  if (saleId) {
    return {
      saleId,
      date,
      productId,
      quantity,
    };
  }

  return {
    date,
    productId,
    quantity,
  };
});

const getAll = async () => {
const [sales] = await connection.execute(`
    SELECT
        sapr.sale_id,
        sapr.product_id,
        sapr.quantity,
        sa.date
    FROM sales_products as sapr
    INNER JOIN sales as sa
    ON sa.id = sapr.sale_id
    ORDER BY sapr.sale_id, sapr.product_id;`);
  
    return serialize(sales);
};

const getById = async (id) => {
  const [sales] = await connection.execute(`
  SELECT
    sapr.product_id,
    sapr.quantity,
    sa.date
  FROM sales_products as sapr
  INNER JOIN  sales as sa
  ON sapr.sale_id = ? AND sapr.sale_id = sa.id
  ORDER BY sapr.sale_id, sapr.product_id;`, [id]);

  return serialize(sales);
};

const add = async (recivedSales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
);

  recivedSales.forEach(async (sale) => {
    const { productId, quantity } = sale;
    await connection.execute(
      ' INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    );
  });

  return {
    id: insertId,
    itemsSold: recivedSales,
  };
};

const update = async (id, recivedSales) => {
  recivedSales.forEach(async (sale) => {
    const { quantity, productId } = sale;
    await connection.execute(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
      [quantity, id, productId],
    );
  });

  return {
    saleId: id,
    itemUpdated: recivedSales,
  };
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};

// Requisito realizado com consulta ao repositorio do Erickson Siqueira: https://github.com/tryber/sd-015-b-store-manager/pull/10/commits/287f5ed9850184b9504a7e13e52175941e8dbc3a