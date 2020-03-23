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

    async sendInfo(infoMessage, recipients, prefixText = "INFO") {

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
                const requestBody = this.__getRequestBody(infoMessage, recipient);
                const requestOptions = this.__getRequestOptions(Buffer.byteLength(requestBody));

                await this.__sendRequest(requestOptions, requestBody);
            }

        } catch (error) {
            throw error;
        }
    }

    //TO-DO
    sendError(error, recipients, prefixText = "ERROR") {
        try {

            if (!error)
                throw new Error("Input parameter \"error\" for \"sendError\" couldn't be null or undefined!");

            if (!Array.isArray(recipients))
                throw new Error("Input parameter \"recipients\" for \"sendError\" must be an array!");

            if (typeof error !== "string")
                error = JSON.stringify(error);

            if (prefixText) error = prefixText + " " + error;
            for (let i = 0; i < recipients.length; i++) {

                const recipient = recipients[i];
                const requestBody = this.__getRequestBody(error, recipient);
                const requestOptions = this.__getRequestOptions(Buffer.byteLength(requestBody));

                await this.__sendRequest(requestOptions, requestBody);
            }

        } catch (error) {
            throw error;
        }
    }


    __getRequestOptions(contentLength) {

        if (!contentLength)
            throw new Error("\"contentLength\" is null or undefined!");

        return {
            host: this.config.telegram_url + process.env.TOKEN,
            query: this.config.send_method,
            method: "POST",
            headers: {
                "Content-Type": !this.config.content_type ? "application/json" : this.config.content_type,
                "Content-Length": contentLength
            }
        };
    }

    __getRequestBody(message, recipient) {

        if (!message)
            throw new Error("\"message\" is null or undefined!");

        if (!recipient)
            throw new Error("\"recipient\" is null or undefined!");

        return {
            chat_id: recipient,
            text: message,
            parse_mode: this.config.parse_mode,
            disable_web_page_preview: true,
            disable_notification: this.config.is_notification_disabled
        }
    }

    __sendRequest(requestOptions, requestBody, recipients) {

        if (!requestOptions)
            throw new Error("\"requestOptions\" is null or undefined!");

        if (!requestBody)
            throw new Error("\"requestBody\" is null or undefined!");

        return new Promise((resolve, reject) => {
            const request = https.request(requestOptions, function (response) {

                let responseBody = "";
                response.on("data", function (data) {
                    responseBody = responseBody + data;
                });
                response.on("end", function () {
                    if (response.statusCode !== 200)
                        return reject(new Error("Telegram api return: " + response.statusCode));

                    resolve();
                });
            });

            request.on("error", function (error) {
                reject(error);
            });

            request.write(requestBody);
            request.end();
        });
    }
}