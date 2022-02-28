const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute(
        'SELECT * FROM StoreManager.products ORDER BY id;',
      );

  return result;
};

module.exports = {
  getAll,
};