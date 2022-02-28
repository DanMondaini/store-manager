const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute(
        'SELECT * FROM StoreManager.products ORDER BY id;',
      );

  return result;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id=?;',
  [id]);

  return product;
};

const getByName = async (name) => {
  const [products] = await connection.execute('SELECT * FROM products WHERE name=?;', [name]);

  return products;
};

const add = async (name, quantity) => {
  const products = await getByName(name);

  if (products.length > 0) return false;

  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?);',
  [name, quantity],
);

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  add,
};