import { Request, Response, NextFunction } from 'express';
// import { verifyToken } from '../auth/token';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400)
      .json({ message: 'All fields must be filled' });
  }

  return next();
};

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401)
      .json({ message: 'Token must be filled' });
  }

  // const tknResult = verifyToken(req.headers.authorization);
  // if (tknResult.isError) return res.status(400).json({ message: tknResult.isError });
  // req.body.user = tknResult;

  return next();
};

export {
  validateLogin,
  verifyAuth,
};
