import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public service;
  constructor() {
    this.service = new LeaderboardService();
  }

  public async getAllLeaderboard(_req: Request, res: Response) {
    const { status, result } = await this.service.getAllLeaderboard();

    // if (message) return res.status(status).json({ message });

    return res.status(status).json(result);
  }
}
