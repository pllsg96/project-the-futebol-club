import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import UserMocked from './mocks/login.mock';
import User from '../database/models/users.model';
import { verifyToken } from '../auth/token';

chai.use(chaiHttp);

const { expect } = chai;

const secret = process.env.JWT_SECRET || 'xomps';

describe('Teste da rota login', () => {
  describe('Verificação login usuário com email e senha', () => {
    beforeEach(async () => {
      const mockUser = new User(UserMocked);
      sinon
        .stub(User, "findOne")
        .resolves(mockUser);
    });


    it('Verificação login usuário com email e senha', async () => {
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
  })
  
  afterEach(sinon.reset)
});
