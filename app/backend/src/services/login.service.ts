import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/Users.interface';
import User from '../database/models/users.model';
import { generateToken, verifyToken } from '../auth/token';

export default class LoginService {
  public model;

  constructor() {
    this.model = User;
  }

  public async getUserByLogin(userData: IUser) {
    const { email, password } = userData;
    const findUser = await this.model.findOne({ where: { email } });
    if (!findUser) return { status: 401, message: 'Incorrect email or password' };

    const checkPassword = bcrypt.compareSync(password, findUser.password);
    if (!checkPassword) return { status: 401, message: 'Incorrect email or password' };

    const creatingToken = generateToken(userData);

    return { status: 200, result: creatingToken };
  }

  public async validateUser(authorization: string) {
    const tknResult = verifyToken(authorization);
    if (tknResult.isError) return { status: 401, message: 'Invalid Token' };

    const { email } = tknResult.withoutPassword;

    const findRole = await this.model.findOne({ where: { email } });

    return { status: 200, role: findRole?.role };
  }
}
