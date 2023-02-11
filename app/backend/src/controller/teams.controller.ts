import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  public service;
  constructor() {
    this.service = new TeamsService();
  }

  public async getAllTeams(_req: Request, res: Response) {
    const { status, message, result } = await this.service.getAllTeams();

    if (message) return res.status(status).json({ message });

    return res.status(status).json({ result });
  }
}
