import matchDefault from '../interfaces/Matches.interface';
import Team from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { verifyToken } from '../auth/token';

export default class MatchesService {
  public model;
  public teamModel;

  constructor() {
    this.model = Matches;
    this.teamModel = Team;
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

  public async insertNewMatch(newMatch: matchDefault, authorization: string) {
    const tknResult = verifyToken(authorization);
    if (tknResult.isError) return { status: 401, message: 'Token must be a valid token' };
    console.log(authorization);

    const doesExistTeam1 = await this.model.findOne({ where: { id: newMatch.awayTeamId } });
    const doesExistTeam2 = await this.model.findOne({ where: { id: newMatch.homeTeamId } });
    if (!doesExistTeam1 || !doesExistTeam2) {
      return {
        status: 404, message: 'There is no team with such id!',
      };
    }

    const creatingMatch = await this.model.create({
      inProgress: true,
      ...newMatch,
    });
    if (!creatingMatch) return { status: 403, message: 'Something gone wrong' };
    return { status: 201, result: creatingMatch };
  }

  public async updateMatch(id: number) {
    const findMatch = await this.model.findOne({ where: { id } });
    if (!findMatch) return { status: 404, message: 'The match was not found' };
    findMatch.update({
      ...findMatch,
      inProgress: false,
    });

    return { status: 200, message: 'Finished' };
  }
}
