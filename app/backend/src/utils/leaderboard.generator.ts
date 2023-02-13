import ILeaderboard from '../interfaces/Leaderboard.interface';
import { IMatch } from '../interfaces/Matches.interface';
import ITeams from '../interfaces/Teams.interface';

export default class LeaderboardGenerator {
  static calculatePoints(homeGoals: number, awayGoals: number) {
    if (homeGoals > awayGoals) return 3;
    if (homeGoals === awayGoals) return 1;
    return 0;
  }

  static checkIfIsWinner(homeGoals: number, awayGoals: number, comparator: string) {
    if ((comparator === 'maior') && (homeGoals > awayGoals)) {
      return 1;
    }
    if ((comparator === 'menor') && (homeGoals < awayGoals)) {
      return 1;
    }
    if ((comparator === 'igual') && (homeGoals === awayGoals)) {
      return 1;
    }
    return 0;
  }

  static generateLeaderboard(xomps: ILeaderboard, team: ITeams, match: IMatch) {
    const teamData = xomps;
    if (team.id === match.homeTeamId) {
      teamData.name = team.teamName;
      teamData.totalPoints += LeaderboardGenerator
        .calculatePoints(match.homeTeamGoals, match.awayTeamGoals);
      teamData.totalGames += 1;
      teamData.totalVictories += LeaderboardGenerator
        .checkIfIsWinner(match.homeTeamGoals, match.awayTeamGoals, 'maior') as number;
      teamData.totalDraws += LeaderboardGenerator
        .checkIfIsWinner(match.homeTeamGoals, match.awayTeamGoals, 'igual') as number;
      teamData.totalLosses += LeaderboardGenerator
        .checkIfIsWinner(match.homeTeamGoals, match.awayTeamGoals, 'menor') as number;
      teamData.goalsFavor += match.homeTeamGoals;
      teamData.goalsOwn += match.awayTeamGoals;
      teamData.goalsBalance = (teamData.goalsFavor - teamData.goalsOwn).toFixed(2);
      teamData.efficiency = (((teamData.totalPoints) / (teamData.totalGames * 3)) * 100).toFixed(2);
    }
    return teamData;
  }
}
