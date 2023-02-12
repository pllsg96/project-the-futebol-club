import { Router } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.getAllLeaderboard.bind(leaderboardController));

export default leaderboardRouter;
