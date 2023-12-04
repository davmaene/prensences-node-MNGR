const Sequelize = require('sequelize');
const { Configs } = require('../configs/configs.js');
const moment = require('moment');
const dotenv = require("dotenv");
const { now } = require('../helpers/helper.moment.js');

dotenv.config();

const Citations = Configs.define('__tbl_p_citations', {
    citation: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    category: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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

Citations.sync({ alter: true })
    .then(() => {
        console.log('=======> Cerated done `table Citations` ');
    })
    .catch((error) => {
        console.error('Une erreur s\'est produite lors de la création de la table :', error);
    });

module.exports = {
    Citations
}
