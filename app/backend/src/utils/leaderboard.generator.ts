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
      teamData.goalsBalance = (teamData.goalsFavor - teamData.goalsOwn);
      teamData.efficiency = (((teamData.totalPoints) / (teamData.totalGames * 3)) * 100).toFixed(2);
    }
    return teamData;
  }

  static generateAwayLeaderboard(xomps: ILeaderboard, team: ITeams, match: IMatch) {
    const teamData = xomps;
    if (team.id === match.awayTeamId) {
      teamData.name = team.teamName;
      teamData.totalPoints += LeaderboardGenerator
        .calculatePoints(match.awayTeamGoals, match.homeTeamGoals);
      teamData.totalGames += 1;
      teamData.totalVictories += LeaderboardGenerator
        .checkIfIsWinner(match.awayTeamGoals, match.homeTeamGoals, 'maior') as number;
      teamData.totalDraws += LeaderboardGenerator
        .checkIfIsWinner(match.awayTeamGoals, match.homeTeamGoals, 'igual') as number;
      teamData.totalLosses += LeaderboardGenerator
        .checkIfIsWinner(match.awayTeamGoals, match.homeTeamGoals, 'menor') as number;
      teamData.goalsFavor += match.awayTeamGoals;
      teamData.goalsOwn += match.homeTeamGoals;
      teamData.goalsBalance = (teamData.goalsFavor - teamData.goalsOwn);
      teamData.efficiency = (((teamData.totalPoints) / (teamData.totalGames * 3)) * 100).toFixed(2);
    }
    return teamData;
  }

  static orderLeader(leader: ILeaderboard[]) {
    return leader.sort((home: ILeaderboard, away: ILeaderboard) => {
      if (home.totalPoints < away.totalPoints) return 1;
      if (home.totalPoints > away.totalPoints) return -1;
      if (home.goalsBalance < away.goalsBalance) return 1;
      if (home.goalsBalance > away.goalsBalance) return -1;
      if (home.goalsFavor < away.goalsFavor) return 1;
      if (home.goalsFavor > away.goalsFavor) return -1;
      if (home.goalsOwn < away.goalsOwn) return -1;
      if (home.goalsOwn > away.goalsOwn) return 1;
      return 0;
    });
  }
}
