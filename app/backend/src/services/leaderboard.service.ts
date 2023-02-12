import TeamsService from './teams.service';
import MatchesService from './matches.service';
import leaderboardPattern from '../utils/leaderboard.pattern';
import LeaderboardGenerator from '../utils/leaderboard.generator';
import ILeaderboard from '../interfaces/Leaderboard.interface';

export default class LeaderboardService {
  public teamService;
  public matchesService;
  public finalLeaderboard: [];
  public teamData: ILeaderboard;
  public lboard;

  constructor() {
    this.teamService = new TeamsService();
    this.matchesService = new MatchesService();
    this.finalLeaderboard = [];
    this.lboard = new LeaderboardGenerator();
    this.teamData = leaderboardPattern();
  }

  public async getAllLeaderboard() {
    const allTeams = await (await this.teamService.getAllTeams()).result;
    const allMatches = await (await this.matchesService.getMatchesByStatus(false)).result;

    allTeams?.forEach((team) => {
      this.teamData = leaderboardPattern();

      allMatches?.forEach((match) => {
        this.lboard.generateLeaderboard(this.teamData, team, match);
      });
    });

    return { status: 200, result: finalResult };
  }
}
