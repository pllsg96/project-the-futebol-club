import { Router } from 'express';
import MatchesController from '../controller/matches.controller';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAllMatches.bind(matchesController));

export default matchesRouter;
