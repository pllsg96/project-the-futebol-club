interface IMatch {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

interface IUpdateMatchInProgress {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export {
  IUpdateMatchInProgress,
  IMatch,
};
