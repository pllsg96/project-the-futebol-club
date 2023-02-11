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

  public async insertNewMatch(req: Request, res: Response) {
    const { body } = req;
    const { status, message, result } = await this.service.insertNewMatch(body);
    if (message) return res.status(status).json({ message });

    return res.status(status).json(result);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this.service.updateMatch(Number(id));
    if (message && status !== 200) return res.status(status).json({ message });

    console.log(id);
    return res.status(status).json(message);
  }
}
