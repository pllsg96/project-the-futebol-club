import { Router } from 'express';
import LoginController from '../controller/login.controller';
import validateLogin from '../middlewares/login.middleware';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', validateLogin, loginController.getUserByLogin.bind(loginController));
loginRouter.get('/validate', loginController.validateUser.bind(loginController));

export default loginRouter;
