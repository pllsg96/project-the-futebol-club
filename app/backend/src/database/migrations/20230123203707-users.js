'use strict';

module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('users', {
id: {
type: Sequelize.INTEGER,
primaryKey: true,
allowNull: false,
autoIncrement: true,
},
username: {
allowNull: false,
type: Sequelize.STRING,
},
role: {
allowNull: false,
type: Sequelize.STRING,
},
email: {
allowNull: false,
type: Sequelize.STRING,
},
password: {
allowNull: false,
type: Sequelize.STRING,
}
});
},
down: async (queryInterface) => {
await queryInterface.dropTable('users');
},
}; 