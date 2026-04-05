'use strict';

module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.createTable('records', {
id: {
type: Sequelize.INTEGER,
autoIncrement: true,
primaryKey: true,
allowNull: false,
},
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },

  type: {
    type: Sequelize.ENUM('income', 'expense'),
    allowNull: false,
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  notes: {
    type: Sequelize.TEXT,
    allowNull: true,
  },

  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },

  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

},

async down(queryInterface, Sequelize) {
await queryInterface.dropTable('records');
},
};
