const https = require("https");
const fs = require("fs");
const promisify = require("util").promisify;
const fileReader = promisify(fs.readFile);

const loadConfiguration = async function (pathToConfig) {
    try {

        const config = await fileReader(pathToConfig, "utf8");
        if (!config)
            throw new Error("Configuration file not read or not found!");

        return JSON.parse(config);    

    } catch (error) {
        throw error;
    }
}

class BotLogger {
    constructor(botToken) {
        if (!botToken)
            throw new Error("Input parameter for BotLogger constructor couldn't be null or undefined!");

        if (typeof botToken !== "string")
            throw new Error("Input parameter for BotLogger constructor must be the string type!");

        this.botToken = botToken;
        
    }

    async sendLogMessage(logMessage, recipients, prefixText = "") {
        try {
            if (!logMessage)
                throw new Error("Input parameter \"logMessage\" couldn't be null or undefined!");

            if (!Array.isArray(recipients))
                throw new Error("Input parameter \"recipients\" must be an array!");

            if (typeof logMessage !== "string")
                logMessage = JSON.stringify(logMessage);

                //TO-DO: Load configuration file to use properties in request
            https.request({ method: "POST", })

        } catch (error) {
            throw error;
        }
    }
}