import matchDefault from '../interfaces/Matches.interface';
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

  public async getMatchesByStatus(matchStatus: boolean) {
    const findMatchesByStatus = await this.model.findAll({
      where: { inProgress: matchStatus },
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
    if (!findMatchesByStatus) return { status: 404, message: 'Not found any matches' };

    return { status: 200, result: findMatchesByStatus };
  }

  public async insertNewMatch(newMatch: matchDefault) {
    const creatingMatch = await this.model.create({
      inProgress: true,
      ...newMatch,
    });

    if (!creatingMatch) return { status: 403, message: 'Something gone wrong' };

    return { status: 201, result: creatingMatch };
  }
}
