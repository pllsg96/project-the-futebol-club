import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/matches.model';
import { mockedLeaderboardAway, mockedLeaderboardHome } from './mocks/leaderboard.mock';
import Team from '../database/models/teams.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota Leaderboard', () => {
  describe('Verifica se retorna todos os leaderboard ao requisitar na rota /leaderboard', () => {
    beforeEach(sinon.restore);

    it('Espera retornar o leaderboard de Home', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedLeaderboardHome);
      expect(chaiHttpResponse.body).to.be.length(16);
    });

    it('Espera retornar o leaderboard de Away', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedLeaderboardAway);
      expect(chaiHttpResponse.body).to.be.length(16);
    });
  })
});
