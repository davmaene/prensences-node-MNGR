const { appConfigs } = require("../configs/app.configs");

const Service = {
    checkDayinOrDayout: async ({ cb }) => {
        const date = new Date();
        const h = date.getHours();
        
        return cb({ date, isin: h < appConfigs.middleday ? 1 : 0 })
    }
}

module.exports = {
    Service
}