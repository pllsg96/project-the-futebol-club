import Team from '../database/models/teams.model';
import Matches from '../database/models/matches.model';

export default class MatchesService {
  public model;

  constructor() {
    this.model = Matches;
  }

  public async getAllMatches() {
    const findAllMatches = await this.model.findAll({
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    if (!findAllMatches) return { status: 404, message: 'Not found any matches' };

    return { status: 200, result: findAllMatches };
  }
}
