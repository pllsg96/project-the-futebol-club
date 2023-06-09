import TeamsService from './teams.service';
import MatchesService from './matches.service';
import leaderboardPattern from '../utils/leaderboard.pattern';
import LeaderboardGenerator from '../utils/leaderboard.generator';
import ILeaderboard from '../interfaces/Leaderboard.interface';

export default class LeaderboardService {
  public teamService;
  public matchesService;
  public finalLeaderboard: ILeaderboard[];
  public teamData: ILeaderboard;

  constructor() {
    this.teamService = new TeamsService();
    this.matchesService = new MatchesService();
    this.finalLeaderboard = [];
    this.teamData = leaderboardPattern();
  }

  public async getAllLeaderboard() {
    this.finalLeaderboard = [];
    const allTeams = (await this.teamService.getAllTeams()).result;
    const allMatches = (await this.matchesService.getMatchesByStatus(false)).result;

    allTeams?.forEach((team) => {
      this.teamData = leaderboardPattern();

      allMatches?.forEach((match) => {
        this.teamData = LeaderboardGenerator
          .generateLeaderboard(this.teamData, team, match);
      });

      this.finalLeaderboard.push(this.teamData);
    });

    LeaderboardGenerator.orderLeader(this.finalLeaderboard);

    return { status: 200, result: this.finalLeaderboard };
  }

  public async getAllAwayLeaderboard() {
    this.finalLeaderboard = [];
    const allTeams = await (await this.teamService.getAllTeams()).result;
    const allMatches = await (await this.matchesService.getMatchesByStatus(false)).result;

    allTeams?.forEach((team) => {
      this.teamData = leaderboardPattern();

      allMatches?.forEach((match) => {
        this.teamData = LeaderboardGenerator
          .generateAwayLeaderboard(this.teamData, team, match);
      });

      this.finalLeaderboard.push(this.teamData);
    });

    LeaderboardGenerator.orderLeader(this.finalLeaderboard);

    return { status: 200, result: this.finalLeaderboard };
  }
}
