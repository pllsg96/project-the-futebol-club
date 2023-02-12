import leaderboardObject from 'src/utils/leaderboard.help';
import Team from '../database/models/teams.model';
import Match from '../database/models/matches.model';
import ITeam from '../interfaces/Teams.interface';
import IMatch from '../interfaces/Matches.interface';

// {
//   "name": "Palmeiras",
//   "totalPoints": 13,
//   "totalGames": 5,
//   "totalVictories": 4,
//   "totalDraws": 1,
//   "totalLosses": 0,
//   "goalsFavor": 17,
//   "goalsOwn": 5,
//   "goalsBalance": 12,
//   "efficiency": 86.67
// },

export default class LeaderboardService {
  public teamModel;
  public matchesModel;

  constructor() {
    this.teamModel = Team;
    this.matchesModel = Match;
  }

  public async getAllLeaderboard() {
    const allMatches = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: [{
        model: this.teamModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: this.teamModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });

    const allTeams = await this.teamModel.findAll();
    const finalResult = this.dataTeams(allTeams, allMatches);

    return { status: 200, result: finalResult };
  }

  public dataTeams(allTeams: ITeam[], allMatches: IMatch[]) {
    const x = allTeams.forEach((team) => {
      leaderboardObject;
      allMatches.forEach((mtch) => {
        if (mtch.home_team_id === team.id) {
          theObject.totalPoints += 3;
        }
      });
    });
  }
}
