const { appConfigs } = require("../configs/app.configs");

const Text = {
    onDayOutBeforeDayOut: {
        middleDay: appConfigs.middleday,
        message: `Sortie avant ${appConfigs.middleday} Heure`
    }
}

module.exports = {
    Text
}