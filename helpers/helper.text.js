const { appConfigs } = require("../configs/app.configs");

const Text = {
    onDayOutBeforeDayOut: {
        middleDay: appConfigs.middleday,
        message: `Sortie avant ${appConfigs.middleday} Heure`
    }
}

const categoriesAppDecision = {
    1: {
        decision: "Utilisateur présent ( Présentiel )",
        options: {}
    },
    2: {
        decision: "Utilisateur absent",
        options: {}
    },
    3: {
        decision: "Utilisateur présent ( Télétravail )",
        options: {}
    },
    4: {
        decision: "Entrer mais pas de sortie ( Ou sortie non signalée )",
        options: {}
    }
}

module.exports = {
    categoriesAppDecision,
    Text
}