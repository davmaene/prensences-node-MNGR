const Sequelize = require('sequelize');
const { Configs } = require('../configs/configs.js');
const moment = require('moment');
const dotenv = require("dotenv");
const { now } = require('../helpers/helper.moment.js');

dotenv.config();

const { APPESCAPESTRING } = process.env

const Users = Configs.define('__tbl_p_users', {
    fsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    idconfig: {
        type: Sequelize.STRING,
        allowNull: true
    },
    matricule: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    isverified: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    tokenpush: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: APPESCAPESTRING
    },
    createdon: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: now()
    }
}, {
    timestamps: false,
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ["email", "phone"]
        }
    ]
});

Users.sync({ alter: true })
    .then(() => {
        console.log('=======> Cerated done `table Users` ');
    })
    .catch((error) => {
        console.error('Une erreur s\'est produite lors de la création de la table :', error);
    });

module.exports = {
    Users
}
