const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/produtcsControllers');
describe('Quando a função getAll do controller for chamada', () => {
  const request = {};
  const response = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe('e não tiverem produtos a serem listados', () => {
    const serviceResponse = [];

    before(() => {
      sinon.stub(productsServices, 'getAll').resolves(serviceResponse);
    });

    after(() => {
      productsServices.getAll.restore();
    });

    it('é chamado com o código 200', async () => {
      await productsControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('retornar um array como resposta', async () => {
      await productsControllers.getAll(request, response);

      expect(response.json.calledWith([])).to.be.true;
    });
  });

  describe('e tiverem produtos a serem listados', () => {
    const serviceResponse = [
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
    ];

    before(() => {
      sinon.stub(productsServices, 'getAll').resolves(serviceResponse);
    });

    after(() => {
      productsServices.getAll.restore();
    });

    it('é chamado com o código 200', async () => {
      await productsControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('retornar um array como resposta', async () => {
      await productsControllers.getAll(request, response);

      expect(response.json.calledWith(serviceResponse)).to.be.true;
    });
  });

});

describe('Quando a função getById do controller for chamada', () => {
  const response = {};
  const next = () => {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe('e o id for inválido', () => {
    const request = { params: { id: undefined } };

    it('é chamado com o código 400', async () => {
      await productsControllers.getById(request, response, next);

      expect(response.status.calledWith(400)).to.be.true;
    });

    it('retorna objeto com a chave mensagem "Product not found"', async () => {
      const errorMessageObj = { message: 'Invalid id.' }
      await productsControllers.getById(request, response, next);

      expect(response.json.calledWith(errorMessageObj)).to.be.true;
    });

  });

  describe('e não encontrar um produto', () => {
    const serviceResponse = undefined;
    const request = { params: { id: 4 } };

    before(() => {
      sinon.stub(productsServices, 'getById').resolves(serviceResponse);
    });
    after(() => {
      productsServices.getById.restore();
    });

    it('é chamado com o código 404', async () => {
      await productsControllers.getById(request, response, next);

      expect(response.status.calledWith(404)).to.be.true;
    });

    it('retorna objeto com a chave mensagem "Product not found"', async () => {
      const errorMessageObj = { message: 'Product not found' };
      await productsControllers.getById(request, response, next);

      expect(response.json.calledWith(errorMessageObj)).to.be.true;
    });
  });

  describe('e encontrar um produto', () => {
    const serviceResponse = {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    };
    const request = { params: { id: 1 } };

    before(() => {
      sinon.stub(productsServices, 'getById').resolves(serviceResponse);
    });
    after(() => {
      productsServices.getById.restore();
    });

    it('é chamado com o código 200', async () => {
      await productsControllers.getById(request, response, next);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('retorna objeto com a chave id', async () => {
      await productsControllers.getById(request, response, next);

      expect(response.json.calledWith(serviceResponse)).to.be.true;
    });
  });

}); 

// A implementação dos teste foi feita com consulta ao repositório do Erickson Siqueira: https://github.com/tryber/sd-015-b-store-manager/pull/10/commits/ef25dbfe6c12e2fee0fc6c43445bfaa1d6203551