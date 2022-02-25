const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );

  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
  );

  return result;
};

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);', [name, quantity],
  );

  return insertId;
};

const update = async ({ id, name, quantity }) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id],
  );

  return result;
};

const exclude = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};