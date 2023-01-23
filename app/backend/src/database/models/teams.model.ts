import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './matches.model';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(20),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeMatchs' });
Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'awayMatchs' });

export default Team;
