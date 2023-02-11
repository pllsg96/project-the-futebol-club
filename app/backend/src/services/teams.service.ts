import Teams from '../database/models/teams.model';

export default class TeamsService {
  public model;

  constructor() {
    this.model = Teams;
  }

  public async getAllTeams() {
    const findAllTeams = await this.model.findAll({ });
    if (!findAllTeams) return { status: 404, message: 'Not found any team' };

    return { status: 200, result: findAllTeams };
  }

  public async getTeamById(idTeam: number) {
    const findById = await this.model.findOne({ where: { id: idTeam } });
    if (!findById) return { status: 404, message: 'Team was not found' };

    return { status: 200, result: findById };
  }
}
