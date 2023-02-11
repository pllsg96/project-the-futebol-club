interface IMatch {
  id?: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress?: true,
}

interface IUpdateMatchInProgress {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}

export {
  IUpdateMatchInProgress,
  IMatch,
};
