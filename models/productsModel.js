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

module.exports = {
  getAll,
  getById,
};