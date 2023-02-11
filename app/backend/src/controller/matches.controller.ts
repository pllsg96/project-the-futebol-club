import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public service;
  constructor() {
    this.service = new MatchesService();
  }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const progressStatus = (inProgress === 'true');
      const { status, message, result } = await this
        .service.getMatchesByStatus(progressStatus);
      if (message) return res.status(status).json({ message });

      return res.status(status).json(result);
    }

    const { status, message, result } = await this.service.getAllMatches();
    if (message) return res.status(status).json({ message });

    return res.status(status).json(result);
  }
}
