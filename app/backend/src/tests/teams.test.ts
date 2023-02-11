import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { mockedTeamId, mockedTeams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota Teams', () => {
  describe('Verifica se retorna todos os times ao requisitar na rota /teams', () => {
    beforeEach(sinon.restore);


    it('Espera retornar todos os teams', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedTeams);
    });

    it('Espera retornar o time com id especificado', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/4')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedTeamId);
    });

  })

});
