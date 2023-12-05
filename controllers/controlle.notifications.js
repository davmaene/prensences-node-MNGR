const { Response } = require("../helpers/helper.message");
const { onSendPushNotification } = require("../services/service.message");

const ControllerNotifications = {
    pushtouser: async (req, res, next) => {
        const { token, body, title, data } = req.body;
        if (!token || !body || !title || !data) return Response(res, 401, "This request must have at least !token || !body || !title || !data")
        try {
            onSendPushNotification({
                somePushTokens: [{
                    token,
                    body,
                    title,
                    data
                }]
            })
                .then(d => {
                    console.log("Done ==> ", d);
                    return Response(res, 200, d)
                })
                .catch(err => {
                    console.log("Error ==> ", err);
                    return Response(res, 500, err)
                })
        } catch (error) {
            return Response(res, 500, error)
        }
    }
}

module.exports = {
    ControllerNotifications
}