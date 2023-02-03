import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  public service;
  constructor() {
    this.service = new LoginService();
  }

  public async getUserByLogin(req: Request, res: Response) {
    const { body } = req;
    const { status, message, result } = await this.service.getUserByLogin(body);

    if (message) return res.status(status).json({ message });

    return res.status(status).json({ token: result });
  }

  public async validateUser(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { status, role } = await this
      .service.validateUser(authorization as string);

    return res.status(status).json({ role });
  }
}
