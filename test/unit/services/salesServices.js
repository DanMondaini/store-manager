const sinon = require('sinon');
const { expect } = require('chai');

const salesModels = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');


describe('Sales', () => {
  describe(('Quando a função getAll do services for chamada'), () => {
    describe('e não tiverem produtos a serem listados', () => {
      before(async () => {
        const result = [];

        sinon.stub(salesModels, 'getAll').resolves(result);
      });

      after(async () => {
        salesModels.getAll.restore();
      });

      it('retorna um array', async () => {
        const response = await salesServices.getAll();

        expect(response).to.be.a('array');
      });

      it('retorna um array vazio', async () => {
        const response = await salesServices.getAll();

        expect(response).to.have.length(0);
      });
    });

    describe('e tiverem produtos a serem listados', () => {
      const modelResponse =
      [
        {
          saleId: 1,
          date: '2022-02-25T20:26:58.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: '2022-02-25T20:26:58.000Z',
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: '2022-02-25T20:26:58.000Z',
          productId: 3,
          quantity: 15
        }
      ];
      before(async () => {
        sinon.stub(salesModels, 'getAll').resolves(modelResponse);
      });

      after(async () => {
        salesModels.getAll.restore();
      });
      it('retorna um array', async () => {
        const response = await salesServices.getAll();

        expect(response).to.be.a('array');
      });
      it('retorna um array com 3 itens', async () => {
        const response = await salesServices.getAll();

        expect(response).to.have.length(3);
      });

      it('o primeiro item deve ser um objeto', async () => {
        const response = await salesServices.getAll();

        expect(response[0]).to.be.a('object');
      });

      it('o primeiro item deve ser um objeto com as chaves "saleId", "date", "productId" e quantity', async () => {
        const response = await salesServices.getAll();

        expect(response[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
      });
      it('o primeiro item deve ser um objeto com chave saleId igual a 1', async () => {
        const response = await salesServices.getAll();

        expect(response[0]).to.be.deep.property('saleId', 1);
      });
      it('o primeiro item deve ser um objeto com chave date igual a "2022-02-25T20:26:58.000Z"', async () => {
        const response = await salesServices.getAll();

        expect(response[0]).to.be.deep.property('date', '2022-02-25T20:26:58.000Z');
      });
      it('o primeiro item deve ser um objeto com chave productId igual a 1', async () => {
        const response = await salesServices.getAll();

        expect(response[0]).to.be.deep.property('productId', 1);
      });
      it('o primeiro item deve ser um objeto com chave quantity igual a 5', async () => {
        const response = await salesServices.getAll();

        expect(response[0]).to.be.deep.property('quantity', 5);
      });
    });
  });
});

// A implementação dos teste foi feita com consulta ao repositório do Erickson Siqueira: https://github.com/tryber/sd-015-b-store-manager/pull/10/commits/ef25dbfe6c12e2fee0fc6c43445bfaa1d6203551