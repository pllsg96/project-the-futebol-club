import ILeaderboard from '../interfaces/Leaderboard.interface';
import { IMatch } from '../interfaces/Matches.interface';
import ITeams from '../interfaces/Teams.interface';

export default class LeaderboardGenerator {

  public calculatePoints(homeGoals: number, awayGoals: number) {
    if (homeGoals > awayGoals) return 3;
    if (homeGoals === awayGoals) return 1;
    return 0;
  }

  public checkIfIsWinner(homeGoals: number, awayGoals: number, parametro: number) {
    if (this.calculatePoints(homeGoals, awayGoals) === parametro) return 1
  }

  public generateLeaderboard(teamData: ILeaderboard, team: ITeams, match: IMatch) {
    if (team.id === match.homeTeamId) {
      teamData.name = team.teamName,
      teamData.totalPoints += this.calculatePoints(match.homeTeamGoals, match.awayTeamGoals),
      teamData.totalGames += 1,
      teamData.totalVictories += this.checkIfIsWinner(match.homeTeamGoals, match.awayTeamGoals, 3) as number,
      teamData.totalDraws += this.checkIfIsWinner(match.homeTeamGoals, match.awayTeamGoals, 1) as number,
      teamData.totalLosses += this.checkIfIsWinner(match.homeTeamGoals, match.awayTeamGoals, 0) as number,
      teamData.goalsFavor += match.homeTeamGoals,
      teamData.goalsOwn += match.awayTeamGoals,
      teamData.goalsBalance = (teamData.goalsFavor - teamData.goalsOwn).toFixed(2),
      teamData.efficiency = (((teamData.totalPoints) / (teamData.totalGames * 3)) * 100).toFixed(2),
    }
  }
}
