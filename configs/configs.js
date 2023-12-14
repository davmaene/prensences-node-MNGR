const Sequelize = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const Configs = new Sequelize(
    process.env.APPDBNAME,
    process.env.APPDBUSERNAME,
    process.env.APPDBPASSWORD
    , {
        port: process.env.APPDBPORT,
        host: process.env.APPDBHOST,
        dialect: process.env.APPDBDIALECT,
        logging: false,
        redisConfigsdialectOptions: {
            lockTimeout: 5000,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }

);

module.exports = {
    Configs
}

