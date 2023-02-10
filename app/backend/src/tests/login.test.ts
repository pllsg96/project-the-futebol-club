import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import { UserTokenMocked, UserMocked } from './mocks/login.mock';
import User from '../database/models/users.model';
import { verifyToken } from '../auth/token';

chai.use(chaiHttp);

const { expect } = chai;

const secret = process.env.JWT_SECRET || 'xomps';

describe('Teste da rota login', () => {
  describe('Verificação login usuário com email e senha', () => {
    beforeEach(sinon.restore);


    it('Espera que o login com senha correto sejam bem sucedidos', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(!!jwt.verify(chaiHttpResponse.body.token, secret)).to.be.equal(true)
    });

    it('Espera um erro, ao passar email errado', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'adminadmin.com',
          password: 'secret_admin'
        });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    it('Espera um erro ao passar email ou password vazio', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: '',
          password: '',
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('Espera erro ao retornar o authorization vazio', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', '');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be filled' });
    });

    it('Espera retornar o role do usuário com o token válido', async () => {
      sinon.stub(User, 'findOne').resolves(UserMocked as User);

      const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', UserTokenMocked);
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('role');
      expect(chaiHttpResponse.body.role).to.have.equal('admin');
    });
  })
  
  // afterEach(sinon.reset)
});
