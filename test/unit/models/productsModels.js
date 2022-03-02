const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModel = require('../../../models/productsModels');

describe(('Quando a função getAll do models for chamada'), () => {
  describe('e não tiverem produtos a serem listados', () => {
    before(async () => {
      const result = [[]];

      sinon.stub(connection, 'execute').resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productModel.getAll();

      expect(response).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const response = await productModel.getAll();

      expect(response).to.have.length(0);
    });
  });

  describe('e tiverem produtos a serem listados', () => {
    before(async () => {
      const result = [
        [
          {
            id: 1,
            name: 'Martelo de Thor',
            quantity: '10',
          },
          {
            id: 2,
            name: 'Traje de encolhimento',
            quantity: '20',
          },
          {
            id: 3,
            name: 'Escudo do Capitão América',
            quantity: '30',
          }
        ]
      ];

      sinon.stub(connection, 'execute').resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('retorna um array', async () => {
      const response = await productModel.getAll();

      expect(response).to.be.a('array');
    });
    it('retorna um array com 3 itens', async () => {
      const response = await productModel.getAll();

      expect(response).to.have.length(3);
    });

    it('o primeiro item deve ser um objeto', async () => {
      const response = await productModel.getAll();

      expect(response[0]).to.be.a('object');
    });

    it('o primeiro item deve ser um objeto com as chaves "id", "name" e "quantity"', async () => {
      const response = await productModel.getAll();

      expect(response[0]).to.have.keys('id', 'name', 'quantity');
    });
  });
});

/*************************** get by id ***************************/

describe('Quando a função getById do Model for chamada', () => {
  describe('e não encontrar um produto', () => {
    const queryResponse = [[]];
    const id = 4;

    before(async () => {

      sinon.stub(connection, 'execute').resolves(queryResponse);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna undefined', async () => {
      const response = await productModel.getById(id);

      expect(response).to.be.equal(undefined);
    });
  });

  describe('e encontrar um produto', () => {
    const modelResponse =
    [
      [
        {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10,
        }
      ]
    ];

    const id = 1;

    before(() => {
      sinon.stub(connection, 'execute').resolves(modelResponse);
    });
    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const product = await productModel.getById(id);

      expect(product).to.be.a('object');
    });

    it('retorna objeto com a chave e id com valor igual a 1', async () => {
      const product = await productModel.getById(id);

      expect(product).to.deep.property('id', 1);
    });
    it('retorna objeto com a chave e name com valor igual a "Martelo de Thor"', async () => {
      const product = await productModel.getById(id);

      expect(product).to.deep.property('name', 'Martelo de Thor');
    });
    it('retorna objeto com a chave e quantity com valor igual a 10', async () => {
      const product = await productModel.getById(id);

      expect(product).to.deep.property('quantity', 10);
    });

  });

});

// A implementação dos teste foi feita com consulta ao repositório do Erickson Siqueira: https://github.com/tryber/sd-015-b-store-manager/pull/10/commits/ef25dbfe6c12e2fee0fc6c43445bfaa1d6203551