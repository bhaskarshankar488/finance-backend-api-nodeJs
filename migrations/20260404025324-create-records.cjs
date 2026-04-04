'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('records', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      type: {
        type: Sequelize.ENUM('income', 'expense')
      },
      category: {
        type: Sequelize.STRING(100)
      },
      date: {
        type: Sequelize.DATEONLY
      },
      note: {
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // IMPORTANT: table name
          key: 'UserID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('records');
  }
};