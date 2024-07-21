const { Sequelize } = require("sequelize");
const logger = require("../../middlewares/logger");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        options: `project=${process.env.ENDPOINT_ID}`
    },
    logging: (msg) => logger.debug(msg),
    logQueryParameters: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

module.exports = {
    sql: sequelize,
}