const Sequelize = require('sequelize');
const { Configs } = require('../configs/configs.js');
const { now } = require('../helpers/helper.moment.js');

const Chats = Configs.define('__tbl_p_chats', {
    sender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiver: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fillconversation: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    content: {
        type: Sequelize.STRING,
        allowNull: true
    },
    attachedfilename: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1 || 0
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

Chats.sync({ alter: true })
    .then(() => {
        console.log('=======> Cerated done `table Chats` ');
    })
    .catch((error) => {
        console.error('Une erreur s\'est produite lors de la création de la table :', error);
    });

module.exports = {
    Chats
}
