import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/Users.interface';

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'xomps';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1h',
} as object;

const generateToken = (info: IUser) => {
  const { password: _, ...withoutPassword } = info;
  const tkn = jwt.sign({ withoutPassword }, secret, jwtConfig);
  return tkn;
};

const verifyToken = (authorization: string) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload as jwt.JwtPayload;
  } catch (error) {
    return { isError: true, error };
  }
};

export {
  generateToken,
  verifyToken,
};
