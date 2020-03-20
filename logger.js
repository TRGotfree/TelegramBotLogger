const https = require("https");

class BotLogger {
    constructor(botToken, config) {
        if (!botToken)
            throw new Error("Input parameter \"botToken\" for BotLogger constructor couldn't be null or undefined!");

        if (typeof botToken !== "string")
            throw new Error("Input parameter \"botToken\" for BotLogger constructor must be the string type!");

        if (!config)
            throw new Error("Input parameter \"config\" for BotLogger constructor couldn't be null or undefined!");

        if (typeof config !== "object")
            throw new Error("Input parameter \"config\" for BotLogger must be an object!");

        this.config = config;
        this.botToken = botToken;
    }

    sendInfo(infoMessage, recipients, prefixText = "") {
        try {
            if (!infoMessage)
                throw new Error("Input parameter \"logMessage\" for \"sendInfo\" couldn't be null or undefined!");

            if (!Array.isArray(recipients))
                throw new Error("Input parameter \"recipients\" for \"sendInfo\" must be an array!");

            if (typeof infoMessage !== "string")
                infoMessage = JSON.stringify(infoMessage);

            if (prefixText) infoMessage = prefixText + " " + infoMessage;

            for (let i = 0; i < recipients.length; i++) {
                const recipient = recipients[i];

                const requestOptions = this.__getRequestOptions();
                const requestBody = this.__getRequestBody(infoMessage);

                //TO-DO
                https.request(requestOptions);
            }

        } catch (error) {
            throw error;
        }
    }

    //TO-DO
    sendError(error, recipients, prefixText = "") {
        try {

            if (!error)
                throw new Error("Input parameter \"error\" for \"sendError\" couldn't be null or undefined!");

            if (!Array.isArray(recipients))
                throw new Error("Input parameter \"recipients\" for \"sendError\" must be an array!");

        } catch (error) {
            throw error;
        }
    }

    //TO-DO
    __getRequestOptions() {
        return {
            method: "POST",
            headers: {
                "Content-Type": !this.config.content_type ? "application/json" : this.config.content_type
            }
        };
    }

    //TO-DO
    __getRequestBody(message) {
        return {

        }
    }
}