const { Expo } = require('expo-server-sdk');
const dotenv = require("dotenv");

dotenv.config();
const { EXPO_ACCESS_TOKEN } = process.env;

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({
    
}); //accessToken: EXPO_ACCESS_TOKEN

const onSendPushNotification = async ({ somePushTokens }) => {
    // Create the messages that you want to send to clients
    let messages = [];
    for (let i = 0; i < somePushTokens.length; i++) {
        const { token, body, title, data } = somePushTokens[i]
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid Expo push token`);
            continue;
        }

        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
            to: token,
            title,
            sound: 'default',
            body,
            // data: { ...data },
        })
    }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    return new Promise((resolve, rejected) => {
        (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                    resolve(ticketChunk)
                } catch (error) {
                    rejected(error)
                }
            }
        })();
    })
}

module.exports = {
    onSendPushNotification
}
