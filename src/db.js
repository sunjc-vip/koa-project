const { Sequelize } = require('sequelize');
const Article = require('./models/Article');

// 创建 Sequelize 实例
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'localhost', // 数据库主机地址
  dialect: 'mysql', // 使用 MySQL 数据库
  logging: false // 关闭 SQL 日志输出，可按需开启
});

// 同步数据库模型
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // 使用 alter 选项，根据模型更新表结构
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

// 测试数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    syncDatabase();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
