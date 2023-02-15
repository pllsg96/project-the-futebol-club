import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import {
  mockedMatches,
  mockedMatchesInProgressTrue,
  mockedMatchesInProgressFalse,
  mockedInsertingMatch,
  mockedUpdateMatch1
} from './mocks/matches.mock';

import { UserTokenMocked } from '../tests/mocks/login.mock'
import Match from '../database/models/matches.model';
import { IMatch } from '../interfaces/Matches.interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota Matches', () => {
  describe('Verifica se retorna todos os matches ao requisitar na rota /matches', () => {
    beforeEach(sinon.restore);


    it('Espera retornar todos os matches', async () => {
      sinon.stub(Match, 'findAll').resolves(mockedMatches as any)
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatches);
      expect(chaiHttpResponse.body).to.be.length(49);
    });
  })

  describe('Verifica se retorna todos os matches ao requisitar na rota /matches?inProgress', () => {
    beforeEach(sinon.restore);

    it('Espera retornar todos os matches em progresso', async () => {
      sinon.stub(Match, 'findAll').resolves(mockedMatchesInProgressTrue as any)
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatchesInProgressTrue);
      expect(chaiHttpResponse.body).to.be.length(8);
    });

    it('Espera retornar todos os matches acabadas', async () => {
      sinon.stub(Match, 'findAll').resolves(mockedMatchesInProgressFalse as any)
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatchesInProgressFalse);
      expect(chaiHttpResponse.body).to.be.length(41);
    });
  })

  describe('Verifica se consegue inserir uma nova partida na rota /matches', () => {
    beforeEach(sinon.restore);

    it('Espera criar uma nova partida', async () => {
      sinon.stub(Match, 'create').resolves(mockedInsertingMatch as any)
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send({
            "homeTeamId": 16,
            "awayTeamId": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
        }).set('Authorization', UserTokenMocked);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedInsertingMatch);
    });

    it('Espera erro ao inserir um time inexistente', async () => {
      sinon.stub(Match, 'create').resolves(mockedInsertingMatch as any)
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send({
            "homeTeamId": 3232,
            "awayTeamId": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
        }).set('Authorization', UserTokenMocked);

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    });
  })

  describe('Verifica se consegue atualizar uma partida na rota /matches e finaliza-la', () => {
    beforeEach(sinon.restore);

    it('Espera finalizar uma match em progresso', async () => {
      sinon.stub(Match, 'update').resolves(mockedUpdateMatch1 as any)
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.equal('Finished');
    });

    it('Espera dar erro ao finalizar uma match inexistente', async () => {
      sinon.stub(Match, 'update').resolves(mockedUpdateMatch1 as any)
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/5222/finish')
        .send({});

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('The match was not found');
    });
  })

  describe('Verifica se consegue atualizar uma partida na rota /matches e finaliza-la', () => {
    beforeEach(sinon.restore);

    it('Espera atualizar o placar de uma match em progresso', async () => {
      sinon.stub(Match, 'update').resolves(mockedUpdateMatch1 as any)
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          "homeTeamGoals": 5,
          "awayTeamGoals": 6
        }).set('Authorization', UserTokenMocked);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedUpdateMatch1);
    });

    it('Espera dar erro ao atualizar uma match inexistente', async () => {
      sinon.stub(Match, 'update').resolves(mockedUpdateMatch1 as any)
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/500')
        .send({
          "homeTeamGoals": 5,
          "awayTeamGoals": 6
        }).set('Authorization', UserTokenMocked);

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('The match was not found');
    });
  })
});
