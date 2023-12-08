const Sequelize = require('sequelize');
const { Configs } = require('../configs/configs.js');
const dotenv = require('dotenv');
const { now, momentNow } = require('../helpers/helper.moment.js');

dotenv.config();

const Presences = Configs.define('__tbl_p_presences', {
    idconfigs: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ref: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ellapsedtowork: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    dayclosed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    iduser: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dayin: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    dayout: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    isvalidated: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    observation: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    appdecision: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },

    updatedon: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: now()
    },
    createdon: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: now()
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Presences.sync({ alter: true })
    .then(() => {
        console.log('=======> Cerated done `table Presences` ');
    })
    .catch((error) => {
        console.error('Une erreur s\'est produite lors de la création de la table :', error);
    });

module.exports = {
    Presences
}
