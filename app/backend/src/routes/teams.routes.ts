import { Router } from 'express';
import TeamsController from '../controller/teams.controller';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.getAllTeams.bind(teamsController));

export default teamsRouter;
