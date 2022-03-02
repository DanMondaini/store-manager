const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute(
        'SELECT * FROM StoreManager.products ORDER BY id;',
      );

  return products;
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

const update = async (id, name, quantity) => {
  const productExist = await getById(id);

  if (!productExist) return false;

  await connection.execute(
    'UPDATE products SET name=?, quantity=? WHERE id=?',
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const exclude = async (id) => {
  const productExist = await getById(id);

  if (!productExist) return false;

  const product = await connection.execute('DELETE FROM products WHERE id=?', [id]);

  return product;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};