const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');


describe('Sales', () => {
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
        const response = await salesModels.getAll();

        expect(response).to.be.a('array');
      });

      it('retorna um array vazio', async () => {
        const response = await salesModels.getAll();

        expect(response).to.have.length(0);
      });
    });

    describe('e tiverem produtos a serem listados', () => {
      const queryResponse = [
        [
          {
            sale_id: 1,
            date: '2022-02-25T20:26:58.000Z',
            product_id: 1,
            quantity: 5
          },
          {
            sale_id: 1,
            date: '2022-02-25T20:26:58.000Z',
            product_id: 2,
            quantity: 10
          },
          {
            sale_id: 2,
            date: '2022-02-25T20:26:58.000Z',
            product_id: 3,
            quantity: 15
          }
        ]
      ];
      before(async () => {
        sinon.stub(connection, 'execute').resolves(queryResponse);
      });

      after(async () => {
        connection.execute.restore();
      });
      it('retorna um array', async () => {
        const response = await salesModels.getAll();

        expect(response).to.be.a('array');
      });
      it('retorna um array com 3 itens', async () => {
        const response = await salesModels.getAll();

        expect(response).to.have.length(3);
      });

      it('o primeiro item deve ser um objeto', async () => {
        const response = await salesModels.getAll();

        expect(response[0]).to.be.a('object');
      });

      it('o primeiro item deve ser um objeto com as chaves "saleId", "date", "productId" e quantity', async () => {
        const response = await salesModels.getAll();

        expect(response[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
      });
      it('o primeiro item deve ser um objeto com chave saleId igual a 1', async () => {
        const response = await salesModels.getAll();

        expect(response[0]).to.be.deep.property('saleId', 1);
      });
      it('o primeiro item deve ser um objeto com chave date igual a "2022-02-25T20:26:58.000Z"', async () => {
        const response = await salesModels.getAll();

        expect(response[0]).to.be.deep.property('date', '2022-02-25T20:26:58.000Z');
      });
      it('o primeiro item deve ser um objeto com chave productId igual a 1', async () => {
        const response = await salesModels.getAll();

        expect(response[0]).to.be.deep.property('productId', 1);
      });
      it('o primeiro item deve ser um objeto com chave quantity igual a 5', async () => {
        const response = await salesModels.getAll();

        expect(response[0]).to.be.deep.property('quantity', 5);
      });
    });

  });
});