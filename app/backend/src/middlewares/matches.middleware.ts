import { Request, Response, NextFunction } from 'express';

const checkDuplicatedMatch = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (body.homeTeamId === body.awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  return next();
};

export default checkDuplicatedMatch;
