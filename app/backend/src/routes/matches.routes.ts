import { Router } from 'express';
import checkDuplicatedMatch from '../middlewares/matches.middleware';
import MatchesController from '../controller/matches.controller';
import { verifyAuth } from '../middlewares/login.middleware';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAllMatches.bind(matchesController));
matchesRouter.post(
  '/',
  verifyAuth,
  checkDuplicatedMatch,
  matchesController.insertNewMatch.bind(matchesController),
);
matchesRouter.patch('/:id/finish', matchesController.updateMatch.bind(matchesController));
matchesRouter.patch('/:id', matchesController.updateMatchInProgress.bind(matchesController));

export default matchesRouter;
