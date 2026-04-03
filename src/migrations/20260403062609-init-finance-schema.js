'use strict';

export async function up(queryInterface, Sequelize) {

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role ENUM('viewer', 'analyst', 'admin') DEFAULT 'viewer',
      status ENUM('active', 'inactive') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS records (
      id INT AUTO_INCREMENT PRIMARY KEY,
      amount DECIMAL(10,2),
      type ENUM('income', 'expense'),
      category VARCHAR(100),
      date DATE,
      note TEXT,
      created_by INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    );
  `);
}

export async function down(queryInterface) {
  await queryInterface.sequelize.query(`DROP TABLE IF EXISTS records;`);
  await queryInterface.sequelize.query(`DROP TABLE IF EXISTS users;`);
}